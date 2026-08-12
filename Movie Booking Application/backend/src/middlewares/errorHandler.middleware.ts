import type { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";

/**
 * Global error-handling middleware.
 *
 * This MUST be registered LAST in the Express middleware chain.
 * It catches all errors thrown or forwarded via `next(err)` and
 * returns a consistently structured JSON error response.
 */
export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
): void => {
    // ── Known operational error (thrown intentionally) ────────────
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            statusCode: err.statusCode,
            errorCode: err.errorCode,
            message: err.message,
            errors: err.errors,
            ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
        });
        return;
    }

    // ── Mongoose CastError (invalid ObjectId that slipped through) ───
    if (err.name === "CastError") {
        const castErr = err as any;
        res.status(400).json({
            success: false,
            statusCode: 400,
            errorCode: ErrorCode.INVALID_OBJECT_ID,
            message: `Invalid value "${castErr.value}" for field "${castErr.path}"`,
            errors: [],
        });
        return;
    }

    // ── Mongoose ValidationError (schema validation failure) ─────
    if (err.name === "ValidationError") {
        const validationErr = err as any;
        const fieldErrors = Object.keys(validationErr.errors).map((field) => ({
            field,
            message: validationErr.errors[field].message,
        }));

        res.status(400).json({
            success: false,
            statusCode: 400,
            errorCode: ErrorCode.VALIDATION_ERROR,
            message: "Validation failed",
            errors: fieldErrors,
        });
        return;
    }

    // ── MongoDB duplicate key error (code 11000) ────────────────
    if ((err as any).code === 11000) {
        const dupErr = err as any;
        const duplicateField = Object.keys(dupErr.keyPattern || {})[0] || "unknown";

        res.status(409).json({
            success: false,
            statusCode: 409,
            errorCode: ErrorCode.DUPLICATE_ENTRY,
            message: `Duplicate value for field "${duplicateField}"`,
            errors: [],
        });
        return;
    }

    // ── Unknown / unexpected error (hide details in production) ──
    console.error("🔥 Unhandled Error:", err);

    res.status(500).json({
        success: false,
        statusCode: 500,
        errorCode: ErrorCode.INTERNAL_ERROR,
        message: process.env.NODE_ENV === "development"
            ? err.message
            : "Internal Server Error",
        errors: [],
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
