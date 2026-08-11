const jwt = require("jsonwebtoken");

const User = require("../user/user.model");
const ApiError = require("../../utils/ApiError");
const asyncHandler = require("../../utils/asyncHandler");

exports.protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check Authorization Header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        throw new ApiError(
            401,
            "Access token is required"
        );
    }

    // Verify JWT
    let decoded;

    try {
        decoded = jwt.verify(
            token,
            process.env.JWT_ACCESS_SECRET
        );
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new ApiError(
                401,
                "Access token expired"
            );
        }

        if (error.name === "JsonWebTokenError") {
            throw new ApiError(
                401,
                "Invalid access token"
            );
        }

        throw new ApiError(
            401,
            "Authentication failed"
        );
    }

    // Find User
    const user = await User.findById(decoded.userId);

    if (!user) {
        throw new ApiError(
            401,
            "User not found"
        );
    }

    if (!user.isActive) {
        throw new ApiError(
            403,
            "Your account has been disabled"
        );
    }

    req.user = user;

    next();
});