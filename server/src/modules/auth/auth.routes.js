const express = require("express");
const router = express.Router();

const { protect } = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");
const ROLES = require("../../constants/roles");

const authController = require("./auth.controller");
const validate = require("../../middleware/validate.middleware");

const {
    registerValidation,
    loginValidation,
    refreshTokenValidation,
} = require("./auth.validation");

// Register
router.post(
  "/register",
  registerValidation,
  validate,
  authController.register
);

// Login
router.post(
  "/login",
  loginValidation,
  validate,
  authController.login
);

// Test Protected Route
router.get("/me", protect, authController.getMe);

// Test Authorization
router.get(
  "/owner-dashboard",
  protect,
  authorize(ROLES.OWNER),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Owner", 
      user: req.user,
    });
  }
);

router.post(
    "/refresh",
    refreshTokenValidation,
    validate,
    authController.refresh
);

router.post(
    "/change-password",
    protect,
    authController.changePassword
);

module.exports = router;