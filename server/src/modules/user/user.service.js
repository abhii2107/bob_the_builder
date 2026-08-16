const User = require("./user.model");
const ApiError = require("../../utils/ApiError");

exports.createUser = async (data, companyId) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new ApiError(409, "Email already exists");
  }

  const user = await User.create({
    ...data,
    company: companyId,
  });

  return {
    id: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    role: user.role,
    company: user.company,
  };
};

exports.getUsers = async (companyId) => {
  const users = await User.find({
    company: companyId,
  })
    .select("-password -refreshToken")
    .sort({ createdAt: -1 });

  return users;
};

exports.getUserById = async (userId, companyId) => {
  const user = await User.findOne({
    _id: userId,
    company: companyId,
  }).select(
    "firstName lastName email phone role profileImage isActive isEmailVerified lastLogin"
  );

  if (!user) {
    throw new ApiError(404, "Employee not found");
  }

  return user;
};

exports.updateUser = async (
  userId,
  companyId,
  data
) => {
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      company: companyId,
    },
    {
      $set: data,
    },
    {
      new: true,
      runValidators: true,
    }
  ).select(
    "firstName lastName email phone role isActive"
  );

  if (!user) {
    throw new ApiError(404, "Employee not found");
  }

  return user;
};

exports.updateUserStatus = async (userId, companyId, isActive) => {
  const user = await User.findOneAndUpdate(
    {
      _id: userId,
      company: companyId,
    },
    {
      isActive,
    },
    {
      new: true,
    }
  ).select("firstName lastName email role isActive");

  if (!user) {
    throw new ApiError(404, "Employee not found");
  }

  return user;
};