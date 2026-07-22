const express = require("express");
const router = express.Router();

const companyController = require("./company.controller");
const { protect } = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");
const validate = require("../../middleware/validate.middleware");
const ROLES = require("../../constants/roles");

const {
  updateCompanyValidation,
} = require("./company.validation");

router.get(
  "/profile",
  protect,
  companyController.getCompanyProfile
);

router.put(
  "/profile",
  protect,
  authorize(ROLES.OWNER),
  updateCompanyValidation,
  validate,
  companyController.updateCompanyProfile
);

module.exports = router;