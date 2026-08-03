const express = require("express");

const router = express.Router();

const dashboardController =
require("./dashboard.controller");

const {
  protect,
} = require("../../middleware/auth.middleware");

const authorize =
require("../../middleware/authorize.middleware");

const ROLES =
require("../../constants/roles");

router.get(
  "/overview",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.STORE_MANAGER
  ),
  dashboardController.getOverview
);

module.exports = router;