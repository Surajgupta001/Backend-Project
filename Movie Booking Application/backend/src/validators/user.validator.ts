import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";
import { USER_ROLES } from "../constants/constants";

/**
 * Validates the request body for user signup.
 */
export const validateSignupRequest = (req: Request, _res: Response, next: NextFunction): void => {
    const { name, email, password, userRole } = req.body;
    const errors: Record<string, string>[] = [];

    // Name Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
        errors.push({ field: "name", message: "Name is required and must be a non-empty string." });
    } else if (name.trim().length < 3) {
        errors.push({ field: "name", message: "Name must be at least 3 characters." });
    }

    // Email Validation
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/;
    if (!email || typeof email !== "string" || email.trim().length === 0) {
        errors.push({ field: "email", message: "Email is required and must be a non-empty string." });
    } else if (!emailRegex.test(email.trim())) {
        errors.push({ field: "email", message: "Please provide a valid email address." });
    }

    // Password Validation
    if (!password || typeof password !== "string" || password.length === 0) {
        errors.push({ field: "password", message: "Password is required." });
    } else if (password.length < 6) {
        errors.push({ field: "password", message: "Password must be at least 6 characters." });
    }

    // Role Validation (Optional, falls back to Customer by default, but if provided must be valid)
    if (userRole !== undefined) {
        if (!Object.values(USER_ROLES).includes(userRole)) {
            errors.push({ field: "userRole", message: `Invalid user role. Must be one of: ${Object.values(USER_ROLES).join(", ")}` });
        }
    }

    if (errors.length > 0) {
        throw new ApiError(400, ErrorCode.VALIDATION_ERROR, "Validation failed", errors);
    }

    next();
};

/**
 * Validates the request body for user signin.
 */
export const validateSigninRequest = (req: Request, _res: Response, next: NextFunction): void => {
    const { email, password } = req.body;
    const errors: Record<string, string>[] = [];

    // Email Validation
    if (!email || typeof email !== "string" || email.trim().length === 0) {
        errors.push({ field: "email", message: "Email is required." });
    }

    // Password Validation
    if (!password || typeof password !== "string" || password.length === 0) {
        errors.push({ field: "password", message: "Password is required." });
    }

    if (errors.length > 0) {
        throw new ApiError(400, ErrorCode.VALIDATION_ERROR, "Validation failed", errors);
    }

    next();
};
