const express = require("express");
const router = express.Router();

const userController = require("./user.controller");

const { protect } = require("../../middleware/auth.middleware");
const authorize = require("../../middleware/authorize.middleware");
const validate = require("../../middleware/validate.middleware");

const ROLES = require("../../constants/roles");

const { createUserValidation, updateUserValidation } = require("./user.validation");

router.post(
  "/",
  protect,
  authorize(ROLES.OWNER),
  createUserValidation,
  validate,
  userController.createUser
);
router.get(
  "/",
  protect,
  authorize(ROLES.OWNER, ROLES.PROJECT_MANAGER),
  userController.getUsers
);

router.get(
  "/:id",
  protect,
  authorize(ROLES.OWNER, ROLES.PROJECT_MANAGER),
  userController.getUserById
);

router.put(
  "/:id",
  protect,
  authorize(ROLES.OWNER),
  updateUserValidation,
  validate,
  userController.updateUser
);

router.patch(
  "/:id/status",
  protect,
  authorize(ROLES.OWNER),
  userController.updateUserStatus
);
module.exports = router;