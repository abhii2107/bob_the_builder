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