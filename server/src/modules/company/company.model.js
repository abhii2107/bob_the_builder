const mongoose = require("mongoose");

const SUBSCRIPTION_PLANS = require("../../constants/subsciptionPlans");
const COMPANY_STATUS = require("../../constants/companyStatus");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Company email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Company phone number is required"],
      trim: true,
    },

    address: {
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

    logo: {
      type: String,
      default: "",
    },

    subscription: {
      type: String,
      enum: Object.values(SUBSCRIPTION_PLANS),
      default: SUBSCRIPTION_PLANS.FREE,
    },

    status: {
      type: String,
      enum: Object.values(COMPANY_STATUS),
      default: COMPANY_STATUS.ACTIVE,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);