const { body } = require("express-validator");

exports.createProjectValidation = [
  body("projectName")
    .trim()
    .notEmpty()
    .withMessage("Project name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Project name must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim(),

  body("projectManager")
    .optional()
    .isMongoId()
    .withMessage("Invalid project manager id"),

  body("siteEngineers")
    .optional()
    .isArray()
    .withMessage("Site engineers must be an array"),

  body("siteEngineers.*")
    .optional()
    .isMongoId()
    .withMessage("Invalid engineer id"),

  body("budget")
    .optional()
    .isNumeric()
    .withMessage("Budget must be a number"),

  body("startDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid start date"),

  body("estimatedEndDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid estimated end date"),
];