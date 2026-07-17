const express = require("express");

const router = express.Router();

const authController = require("./auth.controller");
const validate = require("../../middleware/validate.middleware");
const {
  registerValidation,
} = require("./auth.validation");

router.post(
  "/register",
  registerValidation,
  validate,
  authController.register
);

module.exports = router;