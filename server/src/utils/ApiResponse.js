class ApiResponse {
  constructor(statusCode, message, data = null) {
    this.success = true;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

module.exports = ApiResponse;
// Instead of writing this in every controller:

// res.status(200).json({
//   success: true,
//   message: "User created",
//   data: user,
// });

// we'll write:

// return res.status(201).json(
//   new ApiResponse(
//     201,
//     "User created successfully",
//     user
//   )
// );

// Every API response will have the same format.