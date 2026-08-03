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

module.exports = router;