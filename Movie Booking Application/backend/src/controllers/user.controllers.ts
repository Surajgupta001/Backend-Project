import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import type { AuthAdminProps } from "../types";
import { createUserService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";
import { ErrorCode } from "../utils/errorCodes";

export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData: AuthAdminProps = req.body;

    const user = await createUserService(userData);

    if (!user) {
        return res.status(400).json(
            new ApiResponse(400, ErrorCode.USER_NOT_FOUND, "Failed to create user")
        );
    }

    return res.status(201).json(
        new ApiResponse(201, user, "User created successfully")
    );
});