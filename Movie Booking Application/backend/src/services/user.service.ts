import UserModel from "../models/user.models";
import type { UpdateUserRoleStatusProps } from "../types";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";

/**
 * Update user role or status.
 */
export const updateUserRoleOrStatusService = async (userData: UpdateUserRoleStatusProps) => {
    const { userId, userRole, userStatus } = userData;

    const updateQuery: Partial<{
        userRole: typeof userRole;
        userStatus: typeof userStatus;
    }> = {};

    if (userRole) updateQuery.userRole = userRole;

    if (userStatus) updateQuery.userStatus = userStatus;

    if (Object.keys(updateQuery).length === 0) {
        throw new ApiError(
            400,
            ErrorCode.INVALID_REQUEST,
            "At least userRole or userStatus is required"
        );
    }

    const user = await UserModel.findByIdAndUpdate(
        userId,
        updateQuery, {
        new: true,
        runValidators: true,
    }
    ).select("-password");

    if (!user) {
        throw new ApiError(
            404,
            ErrorCode.USER_NOT_FOUND,
            "User not found"
        );
    }

    return user;
};