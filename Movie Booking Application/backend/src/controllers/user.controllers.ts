import type { Request, Response } from "express";
import type { AuthAdminProps } from "../types";
import { createUserService, signinByEmailService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

/**
 * Signup user
 * POST /api/v1/auth/signup
 */
export const createUser = asyncHandler(async (req: Request, res: Response) => {
    const userData: AuthAdminProps = req.body;

    const user = await createUserService(userData);

    const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        userRole: user.userRole,
        userStatus: user.userStatus,
    };

    return res.status(201).json(
        new ApiResponse(201, userResponse, "User created successfully")
    );
}
);

/**
 * Signin user by email
 * POST /api/v1/auth/signin
 */
export const signinUser = asyncHandler(async (req: Request, res: Response) => {
    const userData: Pick<AuthAdminProps, 'email' | 'password'> = req.body;

    const user = await signinByEmailService(userData);

    const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        userRole: user.userRole,
        userStatus: user.userStatus,
    };

    return res.status(200).json(
        new ApiResponse(200, userResponse, "User signed in successfully")
    );
}
);