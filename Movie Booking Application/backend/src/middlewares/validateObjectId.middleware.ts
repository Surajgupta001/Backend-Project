import mongoose from "mongoose";
import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";

/**
 * Validates that `req.params.id` is a valid MongoDB ObjectId.
 * Must be placed BEFORE any controller that uses `:id` params.
 *
 * Without this, invalid IDs (e.g. "abc123") reach Mongoose and throw
 * a CastError, which would otherwise surface as a 500 Internal Server Error.
 */
export const validateObjectId = (req: Request, _res: Response, next: NextFunction): void => {
    const { id } = req.params;

    if (typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
        throw new ApiError(
            400,
            ErrorCode.INVALID_OBJECT_ID,
            `Invalid ID: "${id}" is not a valid MongoDB ObjectId`,
        );
    }

    next();
};
