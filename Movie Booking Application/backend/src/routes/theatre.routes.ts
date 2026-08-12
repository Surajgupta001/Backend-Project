import { Router } from "express";
import { validateTheatreCreateRequest, validateTheatreUpdateRequest } from "../middlewares/theatre.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";
import {
    createTheatre,
    deleteTheatre,
    getAllTheatres,
    getTheatre,
    updateTheatre,
} from "../controllers/theatre.controllers";

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
theatreRoutes.delete("/:id", validateObjectId, deleteTheatre);

export default theatreRoutes;