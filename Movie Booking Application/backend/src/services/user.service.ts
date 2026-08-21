import { USER_ROLES, USER_STATUS } from "../constants/constants";
import UserModel from "../models/user.models";
import type { AuthAdminProps } from "../types";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";

/**
 * Creates a user in the database.
 */
export const createUserService = async (userData: AuthAdminProps) => {
    // Default to customer if no role is provided
    if (!userData.userRole) {
        userData.userRole = USER_ROLES.customer as typeof userData.userRole;
    }

    // Validate user role
    if (!Object.values(USER_ROLES).includes(userData.userRole)) {
        throw new ApiError(400, ErrorCode.INVALID_USER_ROLE, "Invalid user role");
    }

    // Set status according to role
    if (userData.userRole === USER_ROLES.customer) {
        userData.userStatus = USER_STATUS.approved;
    } else if (userData.userRole === USER_ROLES.admin) {
        userData.userStatus = USER_STATUS.pending;
    }

    const user = await UserModel.create(userData);

    return user;
};

/**
 * Signin user by email.
 */
export const signinByEmailService = async (userData: Pick<AuthAdminProps, "email" | "password">) => {
    const user = await UserModel.findOne({ email: userData.email});

    if (!user) {
        throw new ApiError(404, ErrorCode.USER_NOT_FOUND, "User not found");
    }

    const isPasswordValid = await user.isValidPassword(userData.password);

    if (!isPasswordValid) {
        throw new ApiError(401, ErrorCode.INVALID_CREDENTIALS, "Invalid email or password");
    }

    // Check user status
    if (user.userStatus === USER_STATUS.pending) {
        throw new ApiError(403, ErrorCode.FORBIDDEN, "User account is pending approval");
    }

    if (user.userStatus === USER_STATUS.rejected) {
        throw new ApiError(403, ErrorCode.FORBIDDEN, "User account has been rejected");
    }

    // JWT payload
    const payload = {
        userId: user._id.toString(),
        role: user.userRole,
    };

    // Generate tokens
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    return {
        user,
        accessToken,
        refreshToken,
    };
};