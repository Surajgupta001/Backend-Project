import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";

/**
 * Validates the request body for creating a new movie.
 * All fields are required.
 */
export const validateMovieCreateRequest = (req: Request, _res: Response, next: NextFunction): void => {
    const { name, description, cast, trailerUrl, language, releaseDate, director, releaseStatus } = req.body;
    const errors: Record<string, string>[] = [];

    // Movie Name
    if (!name || typeof name !== "string" || name.trim().length === 0) {
        errors.push({ field: "name", message: "Movie name is required and must be a non-empty string." });
    }

    // Description
    if (!description || typeof description !== "string" || description.trim().length === 0) {
        errors.push({ field: "description", message: "Movie description is required and must be a non-empty string." });
    }

    // Cast (was previously "caste")
    if (!cast || !Array.isArray(cast) || cast.length === 0 || !cast.every((member: unknown) => typeof member === "string")) {
        errors.push({ field: "cast", message: "Movie cast is required and must be a non-empty array of strings." });
    }

    // Trailer URL
    if (!trailerUrl || typeof trailerUrl !== "string" || trailerUrl.trim().length === 0) {
        errors.push({ field: "trailerUrl", message: "Trailer URL is required and must be a non-empty string." });
    }

    // Language
    if (!language || typeof language !== "string" || language.trim().length === 0) {
        errors.push({ field: "language", message: "Language is required and must be a non-empty string." });
    }

    // Release Date — must be a valid date string
    if (!releaseDate) {
        errors.push({ field: "releaseDate", message: "Release date is required." });
    } else if (typeof releaseDate === "string" && isNaN(Date.parse(releaseDate))) {
        errors.push({ field: "releaseDate", message: "Release date must be a valid date string (e.g. '2025-06-15')." });
    }

    // Director
    if (!director || typeof director !== "string" || director.trim().length === 0) {
        errors.push({ field: "director", message: "Director is required and must be a non-empty string." });
    }

    // Release Status
    const allowedStatus = ["UPCOMING", "RELEASED", "ENDED"];
    if (!releaseStatus || typeof releaseStatus !== "string" || !allowedStatus.includes(releaseStatus)) {
        errors.push({ field: "releaseStatus", message: "Release status must be one of: UPCOMING, RELEASED, ENDED." });
    }

    if (errors.length > 0) {
        throw new ApiError(400, ErrorCode.VALIDATION_ERROR, "Validation failed", errors);
    }

    next();
};

/**
 * Validates the request body for updating an existing movie.
 * Only validates fields that are actually present in the body (partial update).
 */
export const validateMovieUpdateRequest = (req: Request, _res: Response, next: NextFunction): void => {
    const { name, description, cast, trailerUrl, language, releaseDate, director, releaseStatus } = req.body;
    const errors: Record<string, string>[] = [];

    // Reject empty body
    if (!req.body || Object.keys(req.body).length === 0) {
        throw new ApiError(400, ErrorCode.VALIDATION_ERROR, "Request body cannot be empty for update");
    }

    if (name !== undefined && (typeof name !== "string" || name.trim().length === 0)) {
        errors.push({ field: "name", message: "Movie name must be a non-empty string." });
    }

    if (description !== undefined && (typeof description !== "string" || description.trim().length === 0)) {
        errors.push({ field: "description", message: "Movie description must be a non-empty string." });
    }

    if (cast !== undefined) {
        if (!Array.isArray(cast) || cast.length === 0 || !cast.every((member: unknown) => typeof member === "string")) {
            errors.push({ field: "cast", message: "Movie cast must be a non-empty array of strings." });
        }
    }

    if (trailerUrl !== undefined && (typeof trailerUrl !== "string" || trailerUrl.trim().length === 0)) {
        errors.push({ field: "trailerUrl", message: "Trailer URL must be a non-empty string." });
    }

    if (language !== undefined && (typeof language !== "string" || language.trim().length === 0)) {
        errors.push({ field: "language", message: "Language must be a non-empty string." });
    }

    if (releaseDate !== undefined) {
        if (typeof releaseDate === "string" && isNaN(Date.parse(releaseDate))) {
            errors.push({ field: "releaseDate", message: "Release date must be a valid date string." });
        }
    }

    if (director !== undefined && (typeof director !== "string" || director.trim().length === 0)) {
        errors.push({ field: "director", message: "Director must be a non-empty string." });
    }

    const allowedStatus = ["UPCOMING", "RELEASED", "ENDED"];
    if (releaseStatus !== undefined && (typeof releaseStatus !== "string" || !allowedStatus.includes(releaseStatus))) {
        errors.push({ field: "releaseStatus", message: "Release status must be one of: UPCOMING, RELEASED, ENDED." });
    }

    if (errors.length > 0) {
        throw new ApiError(400, ErrorCode.VALIDATION_ERROR, "Validation failed", errors);
    }

    next();
};