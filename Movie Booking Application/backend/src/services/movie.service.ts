import MovieModel from "../models/movie.models";

// Create Movie
export const createMovie = async (movieData: MovieProps) => {
    return await MovieModel.create(movieData);
};

// Get All Movies
export const getAllMovies = async () => {
    return await MovieModel.find();
};

// Get Movie By ID
export const getMovieById = async (movieId: string) => {
    return await MovieModel.findById(movieId);
};

// Update Movie
export const updateMovie = async (movieId: string, movieData: Partial<MovieProps>) => {
    return await MovieModel.findByIdAndUpdate(
        movieId,
        movieData,
        {
            new: true,
            runValidators: true,
        }
    );
};

// Delete Movie
export const deleteMovie = async (movieId: string) => {
    return await MovieModel.findByIdAndDelete(movieId);
};

// QUERY BASED SEARCH
export const fetchMoviesByQuery = async (filter: Partial<MovieProps>) => {

    const query: any = {};

    if (filter.name) {
        query.name = {
            $regex: filter.name,
            $options: "i",
        };
    }

    if (filter.language) {
        query.language = {
            $regex: filter.language,
            $options: "i",
        };
    }

    if (filter.director) {
        query.director = {
            $regex: filter.director,
            $options: "i",
        };
    }

    if (filter.releaseStatus) {
        query.releaseStatus = filter.releaseStatus;
    }

    const movies = await MovieModel.find(query);

    if (movies.length === 0) {
        return {
            success: false,
            message: "No movies found matching the query.",
            count: 0,
            data: [],
        };
    }

    return {
        success: true,
        message: "Movies fetched successfully.",
        count: movies.length,
        data: movies,
    };
};