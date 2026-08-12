import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { ErrorCode } from "../utils/errorCodes";
import { createMovieService, deleteMovieService, fetchMoviesByQueryService, getAllMoviesService, getMovieByIdService, updateMovieService } from "../services/movie.service";

/**
 * Create Movie
 * POST /api/v1/movies
 */
export const createMovie = asyncHandler(async (req: Request, res: Response) => {
    const movie = await createMovieService(req.body);

    res.status(201).json(
        new ApiResponse(201, movie, "Movie created successfully"),
    );
});

/**
 * Get All Movies
 * GET /api/v1/movies
 */
export const getAllMovies = asyncHandler(async (_req: Request, res: Response) => {
    const movies = await getAllMoviesService();

    res.status(200).json(
        new ApiResponse(200, movies, "Movies fetched successfully"),
    );
});

/**
 * Get Movie by ID
 * GET /api/v1/movies/:id
 */
export const getMovieById = asyncHandler(async (req: Request, res: Response) => {
    const movie = await getMovieByIdService(req.params.id as string);

    if (!movie) {
        throw new ApiError(404, ErrorCode.MOVIE_NOT_FOUND, "Movie not found");
    }

    res.status(200).json(
        new ApiResponse(200, movie, "Movie fetched successfully"),
    );
});

/**
 * Update Movie
 * PUT /api/v1/movies/:id
 */
export const updateMovie = asyncHandler(async (req: Request, res: Response) => {
    const movie = await updateMovieService(req.params.id as string, req.body);

    if (!movie) {
        throw new ApiError(404, ErrorCode.MOVIE_NOT_FOUND, "Movie not found");
    }

    res.status(200).json(
        new ApiResponse(200, movie, "Movie updated successfully"),
    );
});

/**
 * Delete Movie
 * DELETE /api/v1/movies/:id
 */
export const deleteMovie = asyncHandler(async (req: Request, res: Response) => {
    const movie = await deleteMovieService(req.params.id as string);

    if (!movie) {
        throw new ApiError(404, ErrorCode.MOVIE_NOT_FOUND, "Movie not found");
    }

    res.status(200).json(
        new ApiResponse(200, movie, "Movie deleted successfully"),
    );
});

/**
 * Query-Based Movie Search
 * GET /api/v1/movies/filter?name=...&language=...&director=...&releaseStatus=...
 */
export const getMovieByQuery = asyncHandler(async (req: Request, res: Response) => {
    // Build filter from only the provided query params
    const filter: Partial<MovieProps> = {};

    if (req.query.name) filter.name = req.query.name as string;
    if (req.query.language) filter.language = req.query.language as string;
    if (req.query.director) filter.director = req.query.director as string;
    if (req.query.releaseStatus) filter.releaseStatus = req.query.releaseStatus as MovieProps["releaseStatus"];

    const movies = await fetchMoviesByQueryService(filter);

    if (movies.length === 0) {
        throw new ApiError(404, ErrorCode.MOVIE_NOT_FOUND, "No movies found matching the query");
    }

    res.status(200).json(
        new ApiResponse(200, movies, "Movies fetched successfully"),
    );
});