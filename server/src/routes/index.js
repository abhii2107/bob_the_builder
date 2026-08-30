const express = require("express");

const router = express.Router();
const reportRoutes =
  require("../modules/report/report.routes");
const authRoutes = require("../modules/auth/auth.routes");
const companyRoutes = require("../modules/company/company.routes");
const userRoutes = require("../modules/user/user.routes");
const projectRoutes = require("../modules/project/project.routes");
const assignmentRoutes = require("../modules/projectAssignment/assignment.route");
const inventoryRoutes = require("../modules/inventory/inventory.routes");
const inventoryTransactionRoutes =
  require("../modules/inventoryTransaction/inventoryTransaction.routes");
const dashboardRoutes =
  require("../modules/dashboard/dashboard.routes");
const taskRoutes =
  require("../modules/task/task.routes");
const attendanceRoutes =
  require("../modules/attendance/attendance.routes");

  const aiRoutes =
  require("../modules/ai/ai.routes");

router.use("/auth", authRoutes);
router.use("/company", companyRoutes);
router.use("/users", userRoutes);
router.use("/projects", projectRoutes);
router.use("/assignments", assignmentRoutes);
router.use("/inventory", inventoryRoutes);
console.log("Inventory routes loaded:", !!inventoryRoutes);
console.log("Main API routes loaded");
router.use(
  "/inventory-transactions",
  inventoryTransactionRoutes
);
router.use("/dashboard", dashboardRoutes);

router.use("/attendance", attendanceRoutes);

router.use("/reports", reportRoutes);

router.use("/tasks", taskRoutes);
router.use("/ai", aiRoutes);

module.exports = router;