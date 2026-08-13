/**
 * Centralized application error codes.
 * Used in ApiError responses so the frontend can programmatically
 * identify error types without parsing human-readable messages.
 */

export const ErrorCode = {
    // ── Generic ──────────────────────────────────────
    INTERNAL_ERROR: "INTERNAL_ERROR",
    VALIDATION_ERROR: "VALIDATION_ERROR",
    INVALID_OBJECT_ID: "INVALID_OBJECT_ID",
    ROUTE_NOT_FOUND: "ROUTE_NOT_FOUND",
    DUPLICATE_ENTRY: "DUPLICATE_ENTRY",

    // ── Movie ────────────────────────────────────────
    MOVIE_NOT_FOUND: "MOVIE_NOT_FOUND",
    MOVIE_CREATION_FAILED: "MOVIE_CREATION_FAILED",
    INVALID_MOVIE_ID: "INVALID_MOVIE_ID",
    INVALID_REQUEST: "INVALID_REQUEST",

    // ── Theatre ──────────────────────────────────────
    THEATRE_NOT_FOUND: "THEATRE_NOT_FOUND",
    THEATRE_CREATION_FAILED: "THEATRE_CREATION_FAILED",
} as const;

export type ErrorCodeType = (typeof ErrorCode)[keyof typeof ErrorCode];
