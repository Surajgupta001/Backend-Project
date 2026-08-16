import { Router } from "express";
import { validateMovieCreateRequest, validateMovieUpdateRequest } from "../validators/movie.validator";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import {
    createMovie,
    deleteMovie,
    getAllMovies,
    getMovieById,
    getMovieByQuery,
    updateMovie,
} from "../controllers/movie.controllers";

const movieRoutes = Router();

// Create Movie
movieRoutes.post("/", validateMovieCreateRequest, createMovie);

// Get All Movies
movieRoutes.get("/", getAllMovies);

// Filter/Search Movies (must be before /:id to avoid "filter" being treated as an ID)
movieRoutes.get("/filter", getMovieByQuery);

// Get Movie By ID
movieRoutes.get("/:id", validateObjectId, getMovieById);

// Update Movie
movieRoutes.put("/:id", validateObjectId, validateMovieUpdateRequest, updateMovie);

// Delete Movie
movieRoutes.delete("/:id", validateObjectId, deleteMovie);

export default movieRoutes;