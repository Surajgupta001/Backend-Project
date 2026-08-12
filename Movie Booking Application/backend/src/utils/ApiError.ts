import type { ErrorCodeType } from "./errorCodes";

/**
 * Custom API Error class for operational errors.
 *
 * Throw this anywhere in controllers/services/middleware and the
 * centralized error-handling middleware will format & send the response.
 *
 * @example
 *   throw new ApiError(404, "MOVIE_NOT_FOUND", "Movie not found");
 *   throw new ApiError(400, "VALIDATION_ERROR", "Invalid input", fieldErrors);
 */
export class ApiError extends Error {
    public readonly statusCode: number;
    public readonly errorCode: ErrorCodeType;
    public readonly success: false;
    public readonly errors: Record<string, string>[];
    public readonly data: null;

    constructor(
        statusCode: number,
        errorCode: ErrorCodeType,
        message = "Something went wrong",
        errors: Record<string, string>[] = [],
        stack = "",
    ) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.success = false;
        this.data = null;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
