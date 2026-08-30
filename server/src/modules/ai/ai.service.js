const OpenAI = require("openai");

const User = require("../user/user.model");
const Project = require("../project/project.model");
const Attendance = require("../attendance/attendance.model");
const Inventory = require("../inventory/inventory.model");
const InventoryTransaction = require(
  "../inventoryTransaction/inventoryTransaction.model"
);

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

exports.chat = async (
  message,
  companyId
) => {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(
      "OPENROUTER_API_KEY is not configured."
    );
  }

  // ========================================
  // Get company data
  // ========================================

  const [
    employees,
    projects,
    attendance,
    inventory,
    transactions,
  ] = await Promise.all([
    User.find({
      company: companyId,
      isActive: true,
    })
      .select(
        "firstName lastName email role"
      )
      .lean(),

    Project.find({
      company: companyId,
    })
      .select(
        "projectName projectCode status budget startDate estimatedEndDate"
      )
      .lean(),

    Attendance.find({
      company: companyId,
    })
      .populate(
        "employee",
        "firstName lastName role"
      )
      .populate(
        "project",
        "projectName projectCode"
      )
      .select(
        "employee project date status checkIn checkOut remarks"
      )
      .sort({ date: -1 })
      .limit(200)
      .lean(),

    Inventory.find({
      company: companyId,
      isActive: true,
    })
      .populate(
        "project",
        "projectName projectCode"
      )
      .select(
        "materialName materialCode category unit currentStock minimumStock project"
      )
      .lean(),

    InventoryTransaction.find({
      company: companyId,
    })
      .populate(
        "inventory",
        "materialName materialCode unit"
      )
      .populate(
        "project",
        "projectName projectCode"
      )
      .populate(
        "performedBy",
        "firstName lastName role"
      )
      .sort({ createdAt: -1 })
      .limit(200)
      .lean(),
  ]);

  // ========================================
  // Prepare ERP context
  // ========================================

  const lowStockItems = inventory.filter(
    (item) =>
      Number(item.currentStock) <=
      Number(item.minimumStock)
  );

  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(
    0,
    0,
    0,
    0
  );

  const endOfDay = new Date(today);
  endOfDay.setHours(
    23,
    59,
    59,
    999
  );

  const todayAttendance =
    attendance.filter((item) => {
      const date = new Date(item.date);

      return (
        date >= startOfDay &&
        date <= endOfDay
      );
    });

  const todayStockIn =
    transactions.filter((item) => {
      const date = new Date(
        item.createdAt
      );

      return (
        item.transactionType ===
          "STOCK_IN" &&
        date >= startOfDay &&
        date <= endOfDay
      );
    });

  const todayStockOut =
    transactions.filter((item) => {
      const date = new Date(
        item.createdAt
      );

      return (
        item.transactionType ===
          "STOCK_OUT" &&
        date >= startOfDay &&
        date <= endOfDay
      );
    });

  const context = {
    employees: employees.map(
      (employee) => ({
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        role: employee.role,
      })
    ),

    projects,

    attendance,

    todayAttendance,

    inventory,

    lowStockItems,

    transactions,

    todayStockIn,

    todayStockOut,
  };

  // ========================================
  // Ask OpenRouter
  // ========================================

  const response =
    await openai.chat.completions.create({
      model:
        process.env.OPENROUTER_MODEL ||
        "openrouter/free",

      messages: [
        {
          role: "system",
          content: `
You are BuildOps AI, an assistant for a construction ERP system.

You have access to the authenticated company's ERP data provided below.

Rules:
1. Answer using the provided ERP data whenever possible.
2. Never invent company data.
3. If the requested information is not present in the data, clearly say that you don't have enough information.
4. Keep answers concise and practical.
5. For numerical questions, calculate from the provided data when possible.
6. When discussing inventory, mention material name, current stock, minimum stock, and unit when relevant.
7. When discussing projects, mention project name and status when relevant.
8. When discussing attendance, distinguish PRESENT, ABSENT, HALF_DAY, and LEAVE.
9. Never reveal internal database IDs, API keys, passwords, or private credentials.

ERP DATA:
${JSON.stringify(context)}
          `,
        },

        {
          role: "user",
          content: message,
        },
      ],
    });

  return (
    response.choices?.[0]?.message?.content ||
    "I couldn't generate a response."
  );
};