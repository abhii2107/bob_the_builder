class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);

    this.statusCode = statusCode;
    this.success = false;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ApiError;

// Instead of

// throw new Error("User not found");

// we'll use

// throw new ApiError(
//     404,
//     "User not found"
// );

// Now the error contains both the message and HTTP status code.