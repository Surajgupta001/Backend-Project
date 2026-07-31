import type { Request, Response } from "express";
import MovieModel from "../models/movie.models";

// Create Movie
// POST api/v1/movies
export const createMovie = async (req: Request, res: Response) => {
    try {
        const movie = req.body;

        if (!movie) {
            return res
                .status(400)
                .json({
                    success: false,
                    message: "Movie data is required"

                });
        }

        await MovieModel.create(movie);
        return res
            .status(201)
            .json({
                success: true,
                message: "Movie created successfully",
                movie
            });

    } catch (error) {
        console.error("Error creating movie:", error);
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal server error"
            });
    }
};

// Get All Movies
// GET api/v1/movies
export const getAllMovies = async (req: Request, res: Response) => {
    try {
        const movies = await MovieModel.find();
        if (!movies || movies.length === 0) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "No movies found"
                });
        }
        return res
            .status(200)
            .json({
                success: true,
                message: "Movies fetched successfully",
                movies
            });
    } catch (error) {
        console.error("Error fetching movies:", error);
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal server error"
            });
    }
};

// get Movie by ID
// GET api/v1/movies/:id
export const getMovieById = async (req: Request, res: Response) => {
    try {
        const movie = await MovieModel.findById(req.params.id);
        if (!movie) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Movie not found"
                });
        }
        return res
            .status(200)
            .json({
                success: true,
                message: "Movie fetched successfully",
                movie
            });
    } catch (error) {
        console.error("Error fetching movie:", error);
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal server error"
            });
    }
};

// Update Movie
// PUT api/v1/movies/:id
export const updateMovie = async (req: Request, res: Response) => {
    try {
        const updatedMovie = await MovieModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMovie) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Movie not found"
                });
        }
        return res
            .status(200)
            .json({
                success: true,
                message: "Movie updated successfully",
                movie: updatedMovie
            });
    } catch (error) {
        console.error("Error updating movie:", error);
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal server error"
            });
    }
};

// Delete Movie
// DELETE api/v1/movies
export const deleteMovie = async (req: Request, res: Response) => {
    try {
        const movie = await MovieModel.deleteOne({
            _id: req.params.id
        });
        if (!movie.deletedCount) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Movie not found"
                });
        }
        return res
            .status(200)
            .json({
                success: true,
                message: "Movie deleted successfully",
                movie
            });
    } catch (error) {
        console.error("Error deleting movie:", error);
        return res
            .status(500)
            .json({
                success: false,
                message: "Internal server error"
            });
    }
};