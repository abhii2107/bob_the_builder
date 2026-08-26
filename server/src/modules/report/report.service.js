const Attendance = require("../attendance/attendance.model");
const Inventory = require("../inventory/inventory.model");
const InventoryTransaction = require(
  "../inventoryTransaction/inventoryTransaction.model"
);
const Project = require("../project/project.model");

const ApiError = require("../../utils/ApiError");

// ================================
// Attendance Report
// ================================
exports.getAttendanceReport = async (
  companyId,
  filters = {}
) => {
  const {
    project,
    employee,
    status,
    startDate,
    endDate,
  } = filters;

  const query = {
    company: companyId,
  };

  if (project) {
    query.project = project;
  }

  if (employee) {
    query.employee = employee;
  }

  if (status) {
    query.status = status;
  }

  if (startDate || endDate) {
    query.date = {};

    if (startDate) {
      query.date.$gte = new Date(
        `${startDate}T00:00:00.000`
      );
    }

    if (endDate) {
      query.date.$lte = new Date(
        `${endDate}T23:59:59.999`
      );
    }
  }

  const attendance = await Attendance.find(query)
    .populate(
      "employee",
      "firstName lastName email role"
    )
    .populate(
      "project",
      "projectName projectCode"
    )
    .populate(
      "markedBy",
      "firstName lastName"
    )
    .sort({
      date: -1,
    });

  const summary = {
    total: attendance.length,
    present: attendance.filter(
      (item) => item.status === "PRESENT"
    ).length,
    absent: attendance.filter(
      (item) => item.status === "ABSENT"
    ).length,
    halfDay: attendance.filter(
      (item) => item.status === "HALF_DAY"
    ).length,
    leave: attendance.filter(
      (item) => item.status === "LEAVE"
    ).length,
  };

  return {
    summary,
    attendance,
  };
};

// ================================
// Inventory Report
// ================================
exports.getInventoryReport = async (
  companyId,
  filters = {}
) => {
  const {
    project,
    category,
    isActive,
  } = filters;

  const query = {
    company: companyId,
  };

  if (project) {
    query.project = project;
  }

  if (category) {
    query.category = category;
  }

  if (isActive !== undefined) {
    query.isActive = isActive;
  }

  const inventory = await Inventory.find(query)
    .populate(
      "project",
      "projectName projectCode"
    )
    .populate(
      "createdBy",
      "firstName lastName"
    )
    .sort({
      createdAt: -1,
    });

  const summary = {
    totalMaterials: inventory.length,

    activeMaterials: inventory.filter(
      (item) => item.isActive
    ).length,

    lowStock: inventory.filter(
      (item) =>
        item.currentStock <= item.minimumStock
    ).length,

    totalStockValue: 0,
  };

  return {
    summary,
    inventory,
  };
};

// ================================
// Inventory Transaction Report
// ================================
exports.getInventoryTransactionReport = async (
  companyId,
  filters = {}
) => {
  const {
    inventory,
    project,
    transactionType,
    startDate,
    endDate,
  } = filters;

  const query = {
    company: companyId,
  };

  if (inventory) {
    query.inventory = inventory;
  }

  if (project) {
    query.project = project;
  }

  if (transactionType) {
    query.transactionType = transactionType;
  }

  if (startDate || endDate) {
    query.createdAt = {};

    if (startDate) {
      query.createdAt.$gte = new Date(
        `${startDate}T00:00:00.000`
      );
    }

    if (endDate) {
      query.createdAt.$lte = new Date(
        `${endDate}T23:59:59.999`
      );
    }
  }

  const transactions =
    await InventoryTransaction.find(query)
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
      .sort({
        createdAt: -1,
      });

  const summary = {
    totalTransactions: transactions.length,

    stockIn: transactions.filter(
      (item) =>
        item.transactionType === "STOCK_IN"
    ).length,

    stockOut: transactions.filter(
      (item) =>
        item.transactionType === "STOCK_OUT"
    ).length,

    totalStockInQuantity:
      transactions
        .filter(
          (item) =>
            item.transactionType === "STOCK_IN"
        )
        .reduce(
          (total, item) =>
            total + Number(item.quantity),
          0
        ),

    totalStockOutQuantity:
      transactions
        .filter(
          (item) =>
            item.transactionType === "STOCK_OUT"
        )
        .reduce(
          (total, item) =>
            total + Number(item.quantity),
          0
        ),
  };

  return {
    summary,
    transactions,
  };
};

// ================================
// Project Report
// ================================
exports.getProjectReport = async (
  companyId,
  filters = {}
) => {
  const {
    status,
  } = filters;

  const query = {
    company: companyId,
  };

  if (status) {
    query.status = status;
  }

  const projects = await Project.find(query)
    .populate(
      "createdBy",
      "firstName lastName"
    )
    .populate(
      "siteEngineers",
      "firstName lastName email"
    )
    .sort({
      createdAt: -1,
    });

  const summary = {
    totalProjects: projects.length,

    planning: projects.filter(
      (project) =>
        project.status === "PLANNING"
    ).length,

    ongoing: projects.filter(
      (project) =>
        project.status === "ONGOING"
    ).length,

    completed: projects.filter(
      (project) =>
        project.status === "COMPLETED"
    ).length,

    cancelled: projects.filter(
      (project) =>
        project.status === "CANCELLED"
    ).length,
  };

  return {
    summary,
    projects,
  };
};