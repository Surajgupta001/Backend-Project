import { Router } from "express";
import { createTheatre } from "../controllers/theatre.controllers";

const theatreRoutes = Router();

// Create Theatre
theatreRoutes.post("/", createTheatre);

export default theatreRoutes;