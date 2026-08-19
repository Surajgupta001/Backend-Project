import type { Request, Response } from "express";
import { checkMovieInATheatreService, createTheatreService, deleteTheatreService, getAllTheatresService, getMoviesInTheatreService, getTheatreByIdService, updateMovieInTheatreService, updateTheatreService } from "../services/theatre.service";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";
import { ErrorCode } from "../utils/errorCodes";
import mongoose from "mongoose";
import type { PaginationProps, TheatreProps } from "../types";

/**
 * Create Theatre
 * POST /api/v1/theatres
 */
export const createTheatre = asyncHandler(async (req: Request, res: Response) => {
    const theatre = await createTheatreService(req.body);

    res.status(201).json(
        new ApiResponse(201, theatre, "Theatre created successfully"),
    );
});

/**
 * Get All Theatres
 * GET /api/v1/theatres
 */
export const getAllTheatres = asyncHandler(async (req: Request, res: Response) => {
    const { city, pinCode, name, movieIds } = req.query;

    const filter: Partial<TheatreProps> & { movieIds?: string[] } = {
        city: city as string | undefined,
        pinCode: pinCode ? Number(pinCode) : undefined,
        name: name as string | undefined,
        movieIds: movieIds ? (movieIds as string).split(",") : undefined,
    };

    const pagination: PaginationProps = {
        page: Math.max(Number(req.query.page) || 1, 1),
        limit: Math.min(Math.max(Number(req.query.limit) || 10, 1), 100),
    };

    const theatres = await getAllTheatresService(filter, pagination);

    return res.status(200).json(
        new ApiResponse(200, theatres, "Theatres fetched successfully")
    );
});

/**
 * Get Theatre by ID
 * GET /api/v1/theatres/:id
 */
export const getTheatre = asyncHandler(async (req: Request, res: Response) => {
    const theatre = await getTheatreByIdService(req.params.id as string);

    if (!theatre) {
        throw new ApiError(404, ErrorCode.THEATRE_NOT_FOUND, "Theatre not found");
    }

    res.status(200).json(
        new ApiResponse(200, theatre, "Theatre fetched successfully"),
    );
});

/**
 * Update Theatre
 * PUT /api/v1/theatres/:id
 */
export const updateTheatre = asyncHandler(async (req: Request, res: Response) => {
    const theatre = await updateTheatreService(req.params.id as string, req.body);

    if (!theatre) {
        throw new ApiError(404, ErrorCode.THEATRE_NOT_FOUND, "Theatre not found");
    }

    res.status(200).json(
        new ApiResponse(200, theatre, "Theatre updated successfully"),
    );
});

/**
 * Delete Theatre
 * DELETE /api/v1/theatres/:id
 */
export const deleteTheatre = asyncHandler(async (req: Request, res: Response) => {
    const theatre = await deleteTheatreService(req.params.id as string);

    if (!theatre) {
        throw new ApiError(404, ErrorCode.THEATRE_NOT_FOUND, "Theatre not found");
    }

    res.status(200).json(
        new ApiResponse(200, theatre, "Theatre deleted successfully"),
    );
});

/**
 * Update Movies in Theatre
 * PATCH /api/v1/theatres/:id/movies
 */
export const updateMoviesInTheatre = asyncHandler(async (req: Request, res: Response) => {
    const { movieIds, insert } = req.body;
    const theatreId = req.params.id as string;

    // Validate movie IDs
    if (!Array.isArray(movieIds) || movieIds.length === 0 || !movieIds.every((id) => typeof id === "string" && mongoose.Types.ObjectId.isValid(id))) {
        throw new ApiError(
            400,
            ErrorCode.INVALID_MOVIE_ID,
            "Movie IDs must be a non-empty array of valid IDs"
        );
    }

    // Validate insert
    if (typeof insert !== "boolean") {
        throw new ApiError(
            400,
            ErrorCode.INVALID_REQUEST,
            "Insert must be a boolean"
        );
    }

    const theatre = await updateMovieInTheatreService(theatreId, movieIds, insert);

    if (!theatre) {
        throw new ApiError(
            404,
            ErrorCode.THEATRE_NOT_FOUND,
            "Theatre not found"
        );
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            theatre,
            insert
                ? "Movies added to theatre successfully"
                : "Movies removed from theatre successfully"
        )
    );
});

/**
 * Get Movies in Theatre
 * GET /api/v1/theatres/:id/movies
 */
export const getMoviesInTheatre = asyncHandler(async (req: Request, res: Response) => {
    const theatreId = req.params.id as string;

    const theatre = await getMoviesInTheatreService(theatreId);

    return res.status(200).json(
        new ApiResponse(200, theatre, "Movies in theatre fetched successfully")
    );
});

/**
 * Check if a movie is in a theatre
 * GET /api/v1/theatres/:id/movies/:movieId
 */
export const checkMovieInATheatre = asyncHandler(
    async (req: Request, res: Response) => {
        const theatreId = req.params.id as string;
        const movieId = req.params.movieId as string;

        const isMovieInTheatre = await checkMovieInATheatreService(theatreId, movieId);

        return res.status(200).json(
            new ApiResponse(
                200,
                { isMovieInTheatre },
                isMovieInTheatre ? "Movie is in the theatre" : "Movie is not in the theatre"
            )
        );
    }
);