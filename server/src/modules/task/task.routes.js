const express = require("express");

const router = express.Router();

const taskController = require("./task.controller");

const { protect } = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");
const ROLES = require("../../constants/roles");

router.post(
  "/",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER
  ),
  taskController.createTask
);

router.get(
  "/project/:projectId",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER
  ),
  taskController.getProjectTasks
);

router.get(
  "/:id",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER
  ),
  taskController.getTaskById
);

module.exports = router;