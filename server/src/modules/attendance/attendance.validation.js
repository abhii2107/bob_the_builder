const { body } = require("express-validator");
const ATTENDANCE_STATUS = require("../../constants/attendanceStatus");

exports.updateAttendanceValidation = [
  body("status")
    .optional()
    .isIn(Object.values(ATTENDANCE_STATUS))
    .withMessage("Invalid attendance status"),

  body("checkIn")
    .optional()
    .isString(),

  body("checkOut")
    .optional()
    .isString(),

  body("remarks")
    .optional()
    .trim(),
];

exports.createAttendanceValidation = [
  body("employee")
    .notEmpty()
    .withMessage("Employee is required")
    .isMongoId()
    .withMessage("Invalid employee id"),

  body("project")
    .notEmpty()
    .withMessage("Project is required")
    .isMongoId()
    .withMessage("Invalid project id"),

  body("date")
    .notEmpty()
    .withMessage("Attendance date is required")
    .isISO8601()
    .withMessage("Invalid attendance date"),

  body("status")
    .notEmpty()
    .withMessage("Attendance status is required")
    .isIn(Object.values(ATTENDANCE_STATUS))
    .withMessage("Invalid attendance status"),

  body("checkIn")
    .optional()
    .isString()
    .withMessage("Invalid check-in time"),

  body("checkOut")
    .optional()
    .isString()
    .withMessage("Invalid check-out time"),

  body("remarks")
    .optional()
    .trim(),
];