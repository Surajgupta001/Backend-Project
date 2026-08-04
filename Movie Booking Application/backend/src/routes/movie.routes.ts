import { Router } from "express";
import { validateMovieCreateRequest } from "../middlewares/movie.middleware";
import { createMovie, deleteMovie, getAllMovies, getMovieById, getMovieByQuery, updateMovie } from "../controllers/movie.controllers";

const movieRoutes = Router();

// Create Movie
movieRoutes.post("/", validateMovieCreateRequest, createMovie);

// Get All Movies
movieRoutes.get("/", getAllMovies);

// Filter/Search Movies
movieRoutes.get("/filter", getMovieByQuery);

// Get Movie By ID
movieRoutes.get("/:id", getMovieById);

// Update Movie
movieRoutes.put("/:id", updateMovie);

// Delete Movie
movieRoutes.delete("/:id", deleteMovie);

export default movieRoutes;