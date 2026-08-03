const { body } = require("express-validator");

exports.stockValidation = [
  body("inventory")
    .isMongoId()
    .withMessage("Invalid inventory id"),

  body("quantity")
    .isFloat({ gt: 0 })
    .withMessage("Quantity must be greater than zero"),

  body("remarks")
    .optional()
    .trim(),
];