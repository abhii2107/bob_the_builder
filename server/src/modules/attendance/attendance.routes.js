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

router.delete(
  "/:id",
  protect,
  authorize(ROLES.OWNER),
  attendanceController.deleteAttendance
);

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