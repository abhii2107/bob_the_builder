const mongoose = require("mongoose");

const INVENTORY_TRANSACTION_TYPE = require("../../constants/inventoryTransactionType");

const inventoryTransactionSchema = new mongoose.Schema(
  {
    inventory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory",
      required: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    transactionType: {
      type: String,
      enum: Object.values(INVENTORY_TRANSACTION_TYPE),
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },

    previousStock: {
      type: Number,
      required: true,
    },

    newStock: {
      type: Number,
      required: true,
    },

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

inventoryTransactionSchema.index({ inventory: 1 });
inventoryTransactionSchema.index({ project: 1 });
inventoryTransactionSchema.index({ company: 1 });
inventoryTransactionSchema.index({ transactionType: 1 });

module.exports = mongoose.model(
  "InventoryTransaction",
  inventoryTransactionSchema
);