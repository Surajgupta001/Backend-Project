import type { Request, Response } from "express";
import type { AuthAdminProps, ResetPasswordProps, UpdateUserRoleStatusProps } from "../types";
import { asyncHandler } from "../utils/asyncHandler";
import { createUserService, resetPasswordService, signinByEmailService, updateUserRoleOrStatusService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";

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
});

/**
 * Signin user by email
 * POST /api/v1/auth/signin
 */
export const signinUser = asyncHandler(async (req: Request, res: Response) => {
    const userData: Pick<AuthAdminProps, "email" | "password"> = req.body;

    const { user, accessToken, refreshToken } = await signinByEmailService(userData);

    const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        userRole: user.userRole,
        userStatus: user.userStatus,
    };

    return res.status(200).json(
        new ApiResponse(
            200, {
            user: userResponse,
            accessToken,
            refreshToken,
        },
            "User signed in successfully"
        )
    );
});

/**
 * Reset user password
 * PATCH /api/v1/auth/reset-password
 */
export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
    const resetPasswordData: ResetPasswordProps = {
        userId: req.user!.userId,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword,
        confirmPassword: req.body.confirmPassword,
    };

    const user = await resetPasswordService(resetPasswordData);

    const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        userRole: user.userRole,
        userStatus: user.userStatus,
    };

    return res.status(200).json(
        new ApiResponse(200, userResponse, "Password reset successfully")
    );
});

/**
 * Update user role or status
 * PATCH /api/v1/auth/:id
 */
export const updateUserRoleOrStatus = asyncHandler(async (req: Request, res: Response) => {
    const userData: UpdateUserRoleStatusProps = {
        userId: req.params.id as string,
        userRole: req.body.userRole,
        userStatus: req.body.userStatus,
    };

    const user = await updateUserRoleOrStatusService(userData);

    return res.status(200).json(
        new ApiResponse(
            200,
            user,
            "User updated successfully"
        )
    );
}
);