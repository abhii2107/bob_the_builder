const { body } = require("express-validator");

exports.registerValidation = [
  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required"),

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
    .isEmail()
    .withMessage("Valid email is required"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required"),
];