const { body } = require("express-validator");
const ROLES = require("../../constants/roles");

exports.createAssignmentValidation = [
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

  body("assignedRole")
    .notEmpty()
    .withMessage("Assigned role is required")
    .isIn([
      ROLES.PROJECT_MANAGER,
      ROLES.SITE_ENGINEER,
      ROLES.STORE_MANAGER,
      ROLES.ACCOUNTANT,
      ROLES.WORKER,
      ROLES.CLIENT,
    ])
    .withMessage("Invalid role"),
];