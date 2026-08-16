import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";

/**
 * Validates the request body for creating a new theatre.
 * All fields are required.
 */
export const validateTheatreCreateRequest = (req: Request, _res: Response, next: NextFunction): void => {
    const { name, description, city, pinCode, address } = req.body;
    const errors: Record<string, string>[] = [];

    // Name
    if (!name || typeof name !== "string" || name.trim().length === 0) {
        errors.push({ field: "name", message: "Theatre name is required and must be a non-empty string." });
    } else if (name.trim().length < 3) {
        errors.push({ field: "name", message: "Theatre name must be at least 3 characters." });
    }

    // Description
    if (!description || typeof description !== "string" || description.trim().length === 0) {
        errors.push({ field: "description", message: "Theatre description is required and must be a non-empty string." });
    }

    // City
    if (!city || typeof city !== "string" || city.trim().length === 0) {
        errors.push({ field: "city", message: "City is required and must be a non-empty string." });
    }

    // Pin Code
    if (pinCode === undefined || pinCode === null) {
        errors.push({ field: "pinCode", message: "Pin code is required." });
    } else if (typeof pinCode !== "number" || !Number.isInteger(pinCode)) {
        errors.push({ field: "pinCode", message: "Pin code must be an integer." });
    } else if (pinCode.toString().length !== 6) {
        errors.push({ field: "pinCode", message: "Pin code must be exactly 6 digits." });
    }

    // Address (was previously "addresses")
    if (!address || typeof address !== "string" || address.trim().length === 0) {
        errors.push({ field: "address", message: "Address is required and must be a non-empty string." });
    }

    if (errors.length > 0) {
        throw new ApiError(400, ErrorCode.VALIDATION_ERROR, "Validation failed", errors);
    }

    next();
};

/**
 * Validates the request body for updating an existing theatre.
 * Only validates fields that are actually present in the body (partial update).
 */
export const validateTheatreUpdateRequest = (req: Request, _res: Response, next: NextFunction): void => {
    const { name, description, city, pinCode, address } = req.body;
    const errors: Record<string, string>[] = [];

    // Reject empty body
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, ErrorCode.VALIDATION_ERROR, "Request body cannot be empty for update");
    }

    if (name !== undefined) {
        if (typeof name !== "string" || name.trim().length === 0) {
            errors.push({ field: "name", message: "Theatre name must be a non-empty string." });
        } else if (name.trim().length < 3) {
            errors.push({ field: "name", message: "Theatre name must be at least 3 characters." });
        }
    }

    if (description !== undefined && (typeof description !== "string" || description.trim().length === 0)) {
        errors.push({ field: "description", message: "Theatre description must be a non-empty string." });
    }

    if (city !== undefined && (typeof city !== "string" || city.trim().length === 0)) {
        errors.push({ field: "city", message: "City must be a non-empty string." });
    }

    if (pinCode !== undefined) {
        if (typeof pinCode !== "number" || !Number.isInteger(pinCode)) {
            errors.push({ field: "pinCode", message: "Pin code must be an integer." });
        } else if (pinCode.toString().length !== 6) {
            errors.push({ field: "pinCode", message: "Pin code must be exactly 6 digits." });
        }
    }

    if (address !== undefined && (typeof address !== "string" || address.trim().length === 0)) {
        errors.push({ field: "address", message: "Address must be a non-empty string." });
    }

    if (errors.length > 0) {
        throw new ApiError(400, ErrorCode.VALIDATION_ERROR, "Validation failed", errors);
    }

    next();
};