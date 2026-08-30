const express = require("express");

const router = express.Router();

const aiController = require("./ai.controller");

const {
  protect,
} = require("../../middleware/auth.middleware");

const authorize = require("../../middleware/authorize.middleware");

const ROLES = require("../../constants/roles");

router.post(
  "/chat",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER,
    ROLES.STORE_MANAGER
  ),
  aiController.chat
);

module.exports = router;