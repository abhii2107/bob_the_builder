const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    assignedRole: {
      type: String,
      required: true,
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedDate: {
      type: Date,
      default: Date.now,
    },

    unassignedDate: {
      type: Date,
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

// Only one ACTIVE assignment per employee per project
assignmentSchema.index(
  {
    employee: 1,
    project: 1,
  },
  {
    unique: true,
    partialFilterExpression: {
      isActive: true,
    },
  }
);

assignmentSchema.index({ company: 1 });
assignmentSchema.index({ project: 1 });
assignmentSchema.index({ employee: 1 });

module.exports = mongoose.model(
  "ProjectAssignment",
  assignmentSchema
);