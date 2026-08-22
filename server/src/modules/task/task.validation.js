const { body } = require("express-validator");

exports.createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Task title is required")
    .isLength({ min: 3, max: 150 })
    .withMessage(
      "Task title must be between 3 and 150 characters"
    ),

  body("description")
    .optional()
    .trim(),

  body("project")
    .notEmpty()
    .withMessage("Project is required")
    .isMongoId()
    .withMessage("Invalid project id"),

  body("assignedTo")
    .optional({ nullable: true })
    .isMongoId()
    .withMessage("Invalid employee id"),

  body("priority")
    .optional()
    .isIn([
      "LOW",
      "MEDIUM",
      "HIGH",
      "URGENT",
    ])
    .withMessage("Invalid task priority"),

  body("dueDate")
    .optional({ nullable: true })
    .isISO8601()
    .withMessage("Invalid due date"),
];