const express = require("express");

const router = express.Router();

const attendanceController = require("./attendance.controller");

const {
  createAttendanceValidation,
  updateAttendanceValidation,
} = require("./attendance.validation");

const validate = require("../../middleware/validate.middleware");

const { protect } = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/authorize.middleware");

const ROLES = require("../../constants/roles");


// Company Attendance
router.get(
  "/",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER
  ),
  attendanceController.getCompanyAttendance
);


// Project Attendance
router.get(
  "/project/:projectId",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER
  ),
  attendanceController.getProjectAttendance
);


// Employee Attendance
router.get(
  "/employee/:employeeId",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER
  ),
  attendanceController.getEmployeeAttendance
);


// Update Attendance
router.patch(
  "/:id",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER
  ),
  updateAttendanceValidation,
  validate,
  attendanceController.updateAttendance
);


// Delete Attendance
router.delete(
  "/:id",
  protect,
  authorize(ROLES.OWNER),
  attendanceController.deleteAttendance
);


// Create Attendance
router.post(
  "/",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER
  ),
  createAttendanceValidation,
  validate,
  attendanceController.createAttendance
);


module.exports = router;