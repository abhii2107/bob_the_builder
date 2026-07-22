const { body } = require("express-validator");
const ROLES = require("../../constants/roles");

exports.createUserValidation = [
  body("firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required"),

  body("lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required"),

  body("email")
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("phone")
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid phone number"),

  body("role")
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

exports.updateUserValidation = [
  body("firstName").optional().trim().notEmpty(),
  body("lastName").optional().trim().notEmpty(),

  body("phone")
    .optional()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid phone number"),

  body("role")
    .optional()
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