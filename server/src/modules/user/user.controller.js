const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const userService = require("./user.service");

exports.createUser = asyncHandler(async (req, res) => {
  const user = await userService.createUser(
    req.body,
    req.user.company
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      "Employee created successfully",
      user
    )
  );
});

exports.getUsers = asyncHandler(async (req, res) => {
  const users = await userService.getUsers(req.user.company);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Employees fetched successfully",
      users
    )
  );
});

exports.getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(
    req.params.id,
    req.user.company
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Employee fetched successfully",
      user
    )
  );
});

exports.updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(
    req.params.id,
    req.user.company,
    req.body
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Employee updated successfully",
      user
    )
  );
});

exports.updateUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.updateUserStatus(
    req.params.id,
    req.user.company,
    req.body.isActive
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      "Employee status updated successfully",
      user
    )
  );
});