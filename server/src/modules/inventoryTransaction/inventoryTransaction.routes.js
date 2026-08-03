const express = require("express");

const router = express.Router();

const inventoryTransactionController =
require("./inventoryTransaction.controller");

const {
  stockValidation,
} = require("./inventoryTransaction.validation");

const validate =
require("../../middleware/validate.middleware");

const {
  protect,
} = require("../../middleware/auth.middleware");

const authorize =
require("../../middleware/authorize.middleware");

const ROLES =
require("../../constants/roles");

router.post(
  "/stock-in",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.STORE_MANAGER
  ),
  stockValidation,
  validate,
  inventoryTransactionController.stockIn
);

router.post(
  "/stock-out",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.STORE_MANAGER
  ),
  stockValidation,
  validate,
  inventoryTransactionController.stockOut
);

router.get(
  "/inventory/:inventoryId",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.STORE_MANAGER,
    ROLES.PROJECT_MANAGER
  ),
  inventoryTransactionController.getInventoryTransactions
);

router.get(
  "/project/:projectId",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.PROJECT_MANAGER,
    ROLES.STORE_MANAGER
  ),
  inventoryTransactionController.getProjectTransactions
);

module.exports = router;