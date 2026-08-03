const mongoose = require("mongoose");

const MATERIAL_CATEGORY = require("../../constants/materialCategory");
const MATERIAL_UNIT = require("../../constants/materialUnit");

const inventorySchema = new mongoose.Schema(
  {
    materialName: {
      type: String,
      required: true,
      trim: true,
    },

    materialCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    category: {
      type: String,
      enum: Object.values(MATERIAL_CATEGORY),
      required: true,
    },

    unit: {
      type: String,
      enum: Object.values(MATERIAL_UNIT),
      required: true,
    },

    currentStock: {
      type: Number,
      default: 0,
      min: 0,
    },

    minimumStock: {
      type: Number,
      default: 0,
      min: 0,
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

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
inventorySchema.index({ company: 1 });
inventorySchema.index({ project: 1 });
inventorySchema.index({ category: 1 });

module.exports = mongoose.model(
  "Inventory",
  inventorySchema
);