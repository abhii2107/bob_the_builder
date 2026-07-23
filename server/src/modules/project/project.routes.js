const express = require("express");

const router = express.Router();

const projectController = require("./project.controller");

const {
  createProjectValidation,
} = require("./project.validation");

const validate = require("../../middleware/validate.middleware");

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
  createProjectValidation,
  validate,
  projectController.createProject
);

router.get(
  "/",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER
  ),
  projectController.getAllProjects
);
router.get(
  "/:id",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER
  ),
  projectController.getProjectById
);

module.exports = router;