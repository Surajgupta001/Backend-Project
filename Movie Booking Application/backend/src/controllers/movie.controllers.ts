import type { Request, Response } from "express";
import { createMovieService, deleteMovieService, fetchMoviesByQueryService, getAllMoviesService, getMovieByIdService, updateMovieService } from "../services/movie.service";

// Create Movie
// POST api/v1/movies
export const createMovie = async (req: Request, res: Response) => {
    try {
        const movie = await createMovieService(req.body);

        return res
            .status(201)
            .json({
                success: true,
                message: "Movie created successfully",
                data: movie,
            });

    } catch (error) {
        console.error("Error creating movie:", error);

        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
            });
    }
};

// Get All Movies
// GET api/v1/movies
export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await getAllMoviesService();

        return res
            .status(200)
            .json({
                success: true,
                message: "Movies fetched successfully",
                count: movies.length,
                data: movies,
            });

    } catch (error) {
        console.error("Error fetching movies:", error);

        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
            });
    }
};

// get Movie by ID
// GET api/v1/movies/:id
export const getMovieById = async (req: Request, res: Response) => {
    try {
        const movie = await getMovieByIdService(req.params.id as string);

        if (!movie) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Movie not found",
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Movie fetched successfully",
                data: movie,
            });

    } catch (error) {
        console.error("Error fetching movie:", error);

        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
            });
    }
};

// Update Movie
// PUT api/v1/movies/:id
export const updateMovie = async (req: Request, res: Response) => {
    try {
        const movie = await updateMovieService(
            req.params.id as string,
            req.body
        );

        if (!movie) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Movie not found",
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Movie updated successfully",
                data: movie,
            });

    } catch (error) {
        console.error("Error updating movie:", error);

        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
            });
    }
};

// Delete Movie
// DELETE api/v1/movies
export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const movie = await deleteMovieService(req.params.id as string);

        if (!movie) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Movie not found",
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Movie deleted successfully",
                data: movie,
            });

    } catch (error) {
        console.error("Error deleting movie:", error);

        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
            });
    }
};

// QUERY BASED SEARCH
export const getMovieByQuery = async (req: Request, res: Response) => {
    try {
        const filter: Partial<MovieProps> = {
            name: req.query.name as string,
            language: req.query.language as string,
            director: req.query.director as string,
            releaseStatus: req.query.releaseStatus as string,
        };

        const response = await fetchMoviesByQueryService(filter);

        if (!response.success) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: response.message,
                    data: [],
                });
        }
        
        return res
            .status(200)
            .json({
                success: true,
                message: "Movies fetched successfully",
                count: response.data.length,
                data: response.data,
            });

    } catch (error) {
        console.error(error);

        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
            });
    }
};