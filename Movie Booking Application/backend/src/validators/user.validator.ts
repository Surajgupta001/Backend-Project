import type { NextFunction, Request, Response } from "express";
import { USER_ROLES, USER_STATUS, type UserRole, type UserStatus } from "../constants/constants";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";

/**
 * Validates the request body for updating user role or status.
 */
const isUserRole = (value: unknown): value is UserRole => {
    return Object.values(USER_ROLES).includes(value as UserRole);
};

const isUserStatus = (value: unknown): value is UserStatus => {
    return Object.values(USER_STATUS).includes(
        value as UserStatus
    );
};

export const validateUpdateUserRoleStatusRequest = (req: Request, _res: Response, next: NextFunction): void => {
    const { userRole, userStatus } = req.body;

    const errors: Record<string, string>[] = [];

    // At least one field must be provided
    if (userRole === undefined && userStatus === undefined) {
        errors.push({
            field: "userRole/userStatus",
            message: "At least userRole or userStatus is required.",
        });
    }

    // User role validation
    if (userRole !== undefined && !isUserRole(userRole)) {
        errors.push({
            field: "userRole",
            message: `Invalid user role. Must be one of: ${Object.values(USER_ROLES).join(", ")}`,
        });
    }

    // User status validation
    if (userStatus !== undefined && !isUserStatus(userStatus)) {
        errors.push({
            field: "userStatus",
            message: `Invalid user status. Must be one of: ${Object.values(USER_STATUS).join(", ")}`,
        });
    }

    if (errors.length > 0) {
        throw new ApiError(
            400,
            ErrorCode.VALIDATION_ERROR,
            "Validation failed",
            errors
        );
    }

    next();
};