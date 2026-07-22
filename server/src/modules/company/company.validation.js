const { body } = require("express-validator");

exports.updateCompanyValidation = [
  body("companyName")
    .optional()
    .trim()
    .isLength({ min: 2, max: 100 })
    .withMessage("Company name must be between 2 and 100 characters"),

  body("email")
    .optional()
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage("Invalid company email"),

  body("phone")
    .optional()
    .trim()
    .matches(/^[6-9]\d{9}$/)
    .withMessage("Invalid phone number"),

  body("address.street").optional().trim(),

  body("address.city").optional().trim(),

  body("address.state").optional().trim(),

  body("address.country").optional().trim(),

  body("address.zipCode").optional().trim(),
];