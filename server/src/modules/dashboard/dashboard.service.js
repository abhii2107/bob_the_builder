const User = require("../user/user.model");
const Project = require("../project/project.model");
const Inventory = require("../inventory/inventory.model");
const Attendance = require("../attendance/attendance.model");
const InventoryTransaction = require("../inventoryTransaction/inventoryTransaction.model");

exports.getOverview = async (companyId) => {
  const today = new Date();

  const startOfDay = new Date(today);
  startOfDay.setHours(0, 0, 0, 0);

  const endOfDay = new Date(today);
  endOfDay.setHours(23, 59, 59, 999);

  const [
    totalEmployees,
    activeProjects,
    totalProjects,
    lowStockItems,
    presentToday,
    todayStockIn,
    todayStockOut,
  ] = await Promise.all([
    User.countDocuments({
      company: companyId,
      isActive: true,
    }),

    Project.countDocuments({
      company: companyId,
      status: "IN_PROGRESS",
    }),

    Project.countDocuments({
      company: companyId,
    }),

    Inventory.countDocuments({
      company: companyId,
      $expr: {
        $lte: [
          "$currentStock",
          "$minimumStock",
        ],
      },
    }),

    Attendance.countDocuments({
      company: companyId,
      status: "PRESENT",
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),

    InventoryTransaction.countDocuments({
      company: companyId,
      transactionType: "STOCK_IN",
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),

    InventoryTransaction.countDocuments({
      company: companyId,
      transactionType: "STOCK_OUT",
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    }),
  ]);

  return {
    totalEmployees,
    totalProjects,
    activeProjects,
    presentToday,
    lowStockItems,
    todayStockIn,
    todayStockOut,
  };
};