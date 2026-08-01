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