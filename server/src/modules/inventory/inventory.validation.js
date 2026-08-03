const { body } = require("express-validator");

const MATERIAL_CATEGORY = require("../../constants/materialCategory");
const MATERIAL_UNIT = require("../../constants/materialUnit");

exports.createInventoryValidation = [
  body("materialName")
    .trim()
    .notEmpty()
    .withMessage("Material name is required"),

  body("category")
    .isIn(Object.values(MATERIAL_CATEGORY))
    .withMessage("Invalid material category"),

  body("unit")
    .isIn(Object.values(MATERIAL_UNIT))
    .withMessage("Invalid material unit"),

  body("minimumStock")
    .optional()
    .isNumeric()
    .withMessage("Minimum stock must be a number"),

  body("project")
    .isMongoId()
    .withMessage("Invalid project id"),
];