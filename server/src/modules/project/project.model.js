const mongoose = require("mongoose");

const PROJECT_STATUS = require("../../constants/projectStatus");

const addressSchema = new mongoose.Schema(
  {
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      default: "India",
    },
    zipCode: {
      type: String,
      trim: true,
    },
  },
  {
    _id: false,
  }
);

const projectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      required: true,
      trim: true,
    },

    projectCode: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    projectManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    siteEngineers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    budget: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: Object.values(PROJECT_STATUS),
      default: PROJECT_STATUS.PLANNING,
    },

    startDate: Date,

    estimatedEndDate: Date,

    actualEndDate: Date,

    address: addressSchema,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ company: 1 });
projectSchema.index({ status: 1 });
projectSchema.index({ projectManager: 1 });
projectSchema.index(
  { company: 1, projectCode: 1 },
  { unique: true }
);

module.exports = mongoose.model("Project", projectSchema);