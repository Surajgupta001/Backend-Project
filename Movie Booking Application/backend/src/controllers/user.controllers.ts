import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import type { UpdateUserRoleStatusProps } from "../types";
import { updateUserRoleOrStatusService } from "../services/user.service";
import { ApiResponse } from "../utils/ApiResponse";

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