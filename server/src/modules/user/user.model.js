const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ROLES = require("../../constants/roles");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.OWNER,
    },

    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    profileImage: {
      type: String,
      default: "",
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    refreshToken: {
      type: String,
      default: null,
      select: false,
    },

    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// indexes which will help in searching users by email, company and role
// 1 means in ascending order, -1 means in descending order

userSchema.index({ email: 1 });
userSchema.index({ company: 1 });
userSchema.index({ role: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

// Instead of putting password comparison logic in controllers, we keep it with the model.
// const isMatch = await user.comparePassword(password);
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);