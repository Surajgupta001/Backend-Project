import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";
import { verifyAccessToken } from "../utils/jwt";

/**
 * Verify JWT access token and authenticate the user.
 */
export const verifyJwt = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    // Check Authorization header
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ApiError(401, ErrorCode.TOKEN_REQUIRED, "Access token is required");
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    if (!token) {
        throw new ApiError(401, ErrorCode.TOKEN_REQUIRED, "Access token is required");
    }

    try {
        const decoded = verifyAccessToken(token);

        // Attach authenticated user to request
        req.user = {
            userId: decoded.userId,
            role: decoded.role,
        };

        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            throw new ApiError(401, ErrorCode.TOKEN_EXPIRED, "Access token has expired");
        }

        if (error instanceof jwt.JsonWebTokenError) {
            throw new ApiError(401, ErrorCode.INVALID_TOKEN, "Invalid access token");
        }

        throw error;
    }
};