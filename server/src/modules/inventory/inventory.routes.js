const express = require("express");

const router = express.Router();

const inventoryController =
    require("./inventory.controller");

const {
    createInventoryValidation,
} = require("./inventory.validation");

const validate =
    require("../../middleware/validate.middleware");

const {
    protect,
} = require("../../middleware/auth.middleware");

const authorize =
    require("../../middleware/authorize.middleware");

const ROLES =
    require("../../constants/roles");

const {
    stockTransactionValidation,
} = require("./inventory.validation");

// Get inventory
router.get(
    "/",
    protect,
    authorize(
        ROLES.OWNER,
        ROLES.STORE_MANAGER,
        ROLES.PROJECT_MANAGER,
        ROLES.SITE_ENGINEER
    ),
    inventoryController.getInventory
);

// Create inventory
router.post(
    "/",
    protect,
    authorize(
        ROLES.OWNER,
        ROLES.STORE_MANAGER,
        ROLES.PROJECT_MANAGER
    ),
    createInventoryValidation,
    validate,
    inventoryController.createInventory
);

// Transaction History
router.get(
  "/:id/transactions",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.STORE_MANAGER,
    ROLES.PROJECT_MANAGER,
    ROLES.SITE_ENGINEER
  ),
  inventoryController.getInventoryTransactions
);

// Stock In
router.post(
  "/:id/stock-in",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.STORE_MANAGER,
    ROLES.PROJECT_MANAGER
  ),
  stockTransactionValidation,
  validate,
  inventoryController.stockIn
);

// Stock Out
router.post(
  "/:id/stock-out",
  protect,
  authorize(
    ROLES.OWNER,
    ROLES.STORE_MANAGER,
    ROLES.PROJECT_MANAGER
  ),
  stockTransactionValidation,
  validate,
  inventoryController.stockOut
);


module.exports = router;