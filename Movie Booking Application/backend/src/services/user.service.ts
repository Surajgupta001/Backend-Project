import { USER_ROLES, USER_STATUS } from "../constants/constants";
import UserModel from "../models/user.models";
import type { AuthAdminProps } from "../types";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";

/**
 * Creates a user in the database.
 */
export const createUserService = async (userData: AuthAdminProps) => {
    if (!Object.values(USER_ROLES).includes(userData.userRole)) {
        throw new ApiError(400, ErrorCode.INVALID_USER_ROLE, "Invalid user role");
    }

    if (userData.userRole === USER_ROLES.customer) {
        userData.userStatus = USER_STATUS.approved;
    } else if (userData.userRole === USER_ROLES.admin) {
        userData.userStatus = USER_STATUS.pending;
    }

    return await UserModel.create(userData);
};