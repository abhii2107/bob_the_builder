const asyncHandler = require("../../utils/asyncHandler");
const ApiResponse = require("../../utils/ApiResponse");

const authService = require("./auth.service");

exports.register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);

  return res.status(201).json(
    new ApiResponse(
      201,
      "Company registered successfully",
      result
    )
  );
});
exports.login = asyncHandler(async (req, res) => {
    const result = await authService.login(req.body);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Login successful",
            result
        )
    );
});