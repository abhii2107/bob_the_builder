const express = require("express");

const router = express.Router();

const assignmentController = require("./assignment.controller");

const {
  createAssignmentValidation,
} = require("./assignment.validation");

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
  createAssignmentValidation,
  validate,
  assignmentController.createAssignment
);

router.get(
  "/project/:projectId",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER
  ),
  assignmentController.getProjectAssignments
);

router.get(
  "/employee/:employeeId",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER
  ),
  assignmentController.getEmployeeAssignments
);

router.patch(
  "/:id/remove",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER
  ),
  assignmentController.removeAssignment
);

module.exports = router;