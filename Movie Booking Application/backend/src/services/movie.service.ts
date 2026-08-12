import MovieModel from "../models/movie.models";

/**
 * Create a new movie document.
 */
export const createMovieService = async (movieData: MovieProps) => {
    return await MovieModel.create(movieData);
};

/**
 * Fetch all movies.
 */
export const getAllMoviesService = async () => {
    return await MovieModel.find();
};

/**
 * Find a movie by its MongoDB ObjectId.
 * Returns `null` if not found — controller decides the HTTP response.
 */
export const getMovieByIdService = async (movieId: string) => {
    return await MovieModel.findById(movieId);
};

/**
 * Update a movie by ID. Returns `null` if not found.
 * `runValidators` ensures Mongoose schema validation runs on the update payload.
 */
export const updateMovieService = async (movieId: string, movieData: Partial<MovieProps>) => {
    return await MovieModel.findByIdAndUpdate(
        movieId,
        movieData,
        {
            new: true,
            runValidators: true,
        }
    );
};

/**
 * Delete a movie by ID. Returns `null` if not found.
 */
export const deleteMovieService = async (movieId: string) => {
    return await MovieModel.findByIdAndDelete(movieId);
};

/**
 * Query-based movie search.
 * Builds a Mongoose filter from only the provided (truthy) query params.
 * Returns the array directly — the controller handles the HTTP envelope.
 */
export const fetchMoviesByQueryService = async (filter: Partial<MovieProps>) => {
    const query: Record<string, unknown> = {};

    if (filter.name) {
        query.name = { $regex: filter.name, $options: "i" };
    }

    if (filter.language) {
        query.language = { $regex: filter.language, $options: "i" };
    }

    if (filter.director) {
        query.director = { $regex: filter.director, $options: "i" };
    }

    if (filter.releaseStatus) {
        query.releaseStatus = filter.releaseStatus;
    }

    return await MovieModel.find(query);
};