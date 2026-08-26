import { Router } from "express";
import { validateTheatreCreateRequest, validateTheatreUpdateRequest } from "../validators/theatre.validator";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import {
    checkMovieInATheatre,
    createTheatre,
    deleteTheatre,
    getAllTheatres,
    getMoviesInTheatre,
    getTheatre,
    updateMoviesInTheatre,
    updateTheatre,
} from "../controllers/theatre.controllers";
import { verifyJwt } from "../middlewares/jwt.middleware";

const theatreRoutes = Router();

// Create Theatre
theatreRoutes.post("/", validateTheatreCreateRequest, createTheatre);

// Get All Theatres
theatreRoutes.get("/", getAllTheatres);

// Get Theatre by ID
theatreRoutes.get("/:id", validateObjectId, getTheatre);

// Update Theatre (NEW)
theatreRoutes.put("/:id", validateObjectId, validateTheatreUpdateRequest, updateTheatre);

// Delete Theatre
theatreRoutes.delete("/:id", verifyJwt, validateObjectId, deleteTheatre);

// Update Movies in Theatre
theatreRoutes.patch("/:id/movies", validateObjectId, updateMoviesInTheatre);

// Get Movies in Theatre
theatreRoutes.get("/:id/movies", validateObjectId, getMoviesInTheatre);

// Check if a movie is in a theatre
theatreRoutes.get(
    "/:id/movies/:movieId",
    validateObjectId,
    checkMovieInATheatre
)

export default theatreRoutes;