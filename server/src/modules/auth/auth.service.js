const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const ROLES = require("../../constants/roles");

const Company = require("../company/company.model");
const User = require("../user/user.model");

const ApiError = require("../../utils/ApiError");

class AuthService {
    async register(data) {
        const session = await mongoose.startSession();

        try {
            session.startTransaction();

            // Extract request data
            const {
                companyName,
                firstName,
                lastName,
                email,
                password,
                phone,
            } = data;

            // Check if email already exists
            const existingUser = await User.findOne({ email }).session(session);

            if (existingUser) {
                throw new ApiError(409, "Email is already registered");
            }

            // Create company
            const [company] = await Company.create(
                [
                    {
                        companyName,
                        email,
                        phone,
                    },
                ],
                { session }
            );

            // Create owner user
            const [user] = await User.create(
                [
                    {
                        firstName,
                        lastName,
                        email,
                        password,
                        phone,
                        role: ROLES.OWNER,
                        company: company._id,
                    },
                ],
                { session }
            );

            // Link company with owner
            await Company.findByIdAndUpdate(
                company._id,
                {
                    owner: user._id,
                },
                {
                    session,
                }
            );

            const { generateTokens } = require("../../utils/token.util");

            const { accessToken, refreshToken } =
                await generateTokens(user, session);

            // Commit transaction
            await session.commitTransaction();

            return {
                company: {
                    id: company._id,
                    companyName: company.companyName,
                },

                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                },

                accessToken,
                refreshToken,
            };
        } catch (error) {
            if (session.inTransaction()) {
                await session.abortTransaction();
            }

            if (error.code === 11000) {
                throw new ApiError(409, "Email already exists");
            }

            throw error;
        } finally {
            session.endSession();
        }
    }
    async login(data) {
        const { email, password } = data;

        // Find user with password
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            throw new ApiError(401, "Invalid email or password");
        }

        // Compare password
        const isPasswordValid = await user.comparePassword(password);

        if (!isPasswordValid) {
            throw new ApiError(401, "Invalid email or password");
        }

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Save refresh token
        await User.findByIdAndUpdate(user._id, {
            refreshToken,
        });

        return {
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                company: user.company,
            },
            accessToken,
            refreshToken,
        };
    }

    async refreshAccessToken(refreshToken) {
        if (!refreshToken) {
            throw new ApiError(
                401,
                "Refresh token is required"
            );
        }

        let decoded;

        try {
            decoded = jwt.verify(
                refreshToken,
                process.env.JWT_REFRESH_SECRET
            );
        } catch (error) {
            throw new ApiError(
                401,
                "Invalid or expired refresh token"
            );
        }

        const user = await User.findById(decoded.userId)
            .select("+refreshToken");

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

        // Make sure the refresh token belongs to this user
        if (user.refreshToken !== refreshToken) {
            throw new ApiError(
                401,
                "Invalid refresh token"
            );
        }

        const accessToken = user.generateAccessToken();

        return {
            accessToken,
        };
    }
    async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findById(userId).select("+password");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid =
        await user.comparePassword(currentPassword);

    if (!isPasswordValid) {
        throw new ApiError(
            401,
            "Current password is incorrect"
        );
    }

    user.password = newPassword;
    user.refreshToken = null;

    await user.save();

    return {
        message: "Password changed successfully",
    };
}
}

module.exports = new AuthService();