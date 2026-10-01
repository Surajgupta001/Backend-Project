import type { Request, Response, NextFunction } from "express";
import UserModel from "../models/user.models";
import { USER_ROLES } from "../constants/constants";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";

export const isAdmin = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        throw new ApiError(
            401,
            ErrorCode.UNAUTHORIZED,
            "Unauthorized"
        );
    }

    const user = await UserModel.findById(userId).select("userRole");

    if (!user) {
        throw new ApiError(
            404,
            ErrorCode.USER_NOT_FOUND,
            "User not found"
        );
    }

    if (user.userRole !== USER_ROLES.admin) {
        throw new ApiError(
            403,
            ErrorCode.FORBIDDEN,
            "Admin access required"
        );
    }

    next();
};

export const isClient = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        throw new ApiError(
            401,
            ErrorCode.UNAUTHORIZED,
            "Unauthorized"
        );
    }

    const user = await UserModel.findById(userId).select("userRole");

    if (!user) {
        throw new ApiError(
            404,
            ErrorCode.USER_NOT_FOUND,
            "User not found"
        );
    }

    if (user.userRole !== USER_ROLES.customer) {
        throw new ApiError(
            403,
            ErrorCode.FORBIDDEN,
            "Customer access required"
        );
    }

    next();
};

export const isAdminOrClient = async (req: Request, _res: Response, next: NextFunction): Promise<void> => {
    const userId = req.user?.userId;

    if (!userId) {
        throw new ApiError(
            401,
            ErrorCode.UNAUTHORIZED,
            "Unauthorized"
        );
    }

    const user = await UserModel.findById(userId).select("userRole");

    if (!user) {
        throw new ApiError(
            404,
            ErrorCode.USER_NOT_FOUND,
            "User not found"
        );
    }

    if (user.userRole !== USER_ROLES.admin && user.userRole !== USER_ROLES.customer) {
        throw new ApiError(
            403,
            ErrorCode.FORBIDDEN,
            "Access denied"
        );
    }

    next();
};