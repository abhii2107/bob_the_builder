const express = require("express");

const router = express.Router();

const reportController = require("./report.controller");

const { protect } = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/authorize.middleware");

const ROLES = require("../../constants/roles");

// ================================
// Attendance Report
// ================================
router.get(
  "/attendance",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER
  ),
  reportController.getAttendanceReport
);

// ================================
// Inventory Report
// ================================
router.get(
  "/inventory",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.STORE_MANAGER,
    ROLES.PROJECT_MANAGER
  ),
  reportController.getInventoryReport
);

// ================================
// Inventory Transaction Report
// ================================
router.get(
  "/inventory-transactions",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.STORE_MANAGER,
    ROLES.PROJECT_MANAGER
  ),
  reportController.getInventoryTransactionReport
);

// ================================
// Project Report
// ================================
router.get(
  "/projects",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER
  ),
  reportController.getProjectReport
);

module.exports = router;