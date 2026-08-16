import mongoose from "mongoose";
import TheatreModel from "../models/theatre.models";
import MovieModel from "../models/movie.models";
import { ApiError } from "../utils/ApiError";
import { ErrorCode } from "../utils/errorCodes";

/**
 * Create a new theatre document.
 */
export const createTheatreService = async (theatreData: TheatreProps) => {
    return await TheatreModel.create(theatreData);
};

/**
 * Find a theatre by its MongoDB ObjectId.
 * Returns `null` if not found — controller decides the HTTP response.
 */
export const getTheatreByIdService = async (theatreId: string) => {
    return await TheatreModel.findById(theatreId);
};

/**
 * Fetch all theatres.
 */
export const getAllTheatresService = async (filter: Partial<TheatreProps>) => {
    const query: Record<string, unknown> = {};

    if (filter.city) {
        query.city = { $regex: filter.city, $options: "i" };
    }

    if (filter.pinCode) {
        query.pinCode = filter.pinCode;
    }

    if (filter.name) {
        query.name = { $regex: filter.name, $options: "i" };
    }

    return await TheatreModel.find(query);
};

/**
 * Update a theatre by ID. Returns `null` if not found.
 */
export const updateTheatreService = async (theatreId: string, theatreData: Partial<TheatreProps>) => {
    return await TheatreModel.findByIdAndUpdate(
        theatreId,
        theatreData,
        {
            new: true,
            runValidators: true,
        }
    );
};

/**
 * Delete a theatre by ID. Returns `null` if not found.
 */
export const deleteTheatreService = async (theatreId: string) => {
    return await TheatreModel.findByIdAndDelete(theatreId);
};

/**
 * Update the list of movies in a theatre.
 * If `insert` is true, add the movie IDs to the theatre's list;
 * if false, remove them.
 */
export const updateMovieInTheatreService = async (theatreId: string, movieIds: string[], insert: boolean) => {
    const theatre = await TheatreModel.findById(theatreId);

    if (!theatre) {
        return null;
    }

    if (insert) {
        // Check that all movies actually exist
        const movies = await MovieModel.find({
            _id: { $in: movieIds },
        });

        if (movies.length !== movieIds.length) {
            throw new ApiError(
                404,
                ErrorCode.MOVIE_NOT_FOUND,
                "One or more movies were not found"
            );
        }

        // Add movies without duplicates
        for (const movieId of movieIds) {
            const movieExists = theatre.movies.some((id) => id.toString() === movieId);

            if (!movieExists) {
                theatre.movies.push(
                    new mongoose.Types.ObjectId(movieId)
                );
            }
        }
    } else {
        // Remove movies
        theatre.movies = theatre.movies.filter((id) => !movieIds.includes(id.toString()));
    }

    await theatre.save();

    // Populate movies
    await theatre.populate("movies");

    return theatre;
};