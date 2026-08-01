import type { NextFunction, Request, Response } from "express";

export const validateMovieCreateRequest = (req: Request, res: Response, next: NextFunction) => {

    const { name, description, caste, trailerUrl, language, releaseDate, director, releaseStatus } = req.body;

    // Movie Name
    if (!name || typeof name !== "string") {
        return res
            .status(400)
            .json({
                success: false,
                message: "Movie name is required and must be a string.",
            });
    }

    // Description
    if (!description || typeof description !== "string") {
        return res
            .status(400)
            .json({
                success: false,
                message: "Movie description is required and must be a string.",
            });
    }

    // Caste
    if (!caste || !Array.isArray(caste) || caste.length === 0 || !caste.every((member: unknown) => typeof member === "string")) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Movie caste is required and must be a non-empty array of strings.",
            });
    }

    // Trailer URL
    if (!trailerUrl || typeof trailerUrl !== "string") {
        return res
            .status(400)
            .json({
                success: false,
                message: "Trailer URL is required and must be a string.",
            });
    }

    // Language
    if (!language || typeof language !== "string") {
        return res
            .status(400)
            .json({
                success: false,
                message: "Language is required and must be a string.",
            });
    }

    // Release Date
    if (!releaseDate || typeof releaseDate !== "string") {
        return res
            .status(400)
            .json({
                success: false,
                message: "Release date is required and must be a string.",
            });
    }

    // Director
    if (!director || typeof director !== "string") {
        return res
            .status(400)
            .json({
                success: false,
                message: "Director is required and must be a string.",
            });
    }

    // Release Status
    const allowedStatus = ["UPCOMING", "RELEASED", "ENDED"];

    if (!releaseStatus || typeof releaseStatus !== "string" || !allowedStatus.includes(releaseStatus)) {
        return res
            .status(400)
            .json({
                success: false,
                message: "Release status must be one of: UPCOMING, RELEASED, ENDED.",
            });
    }

    next();
};