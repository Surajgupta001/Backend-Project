import { Router } from "express";
import { createTheatre, getTheatre } from "../controllers/theatre.controllers";
import { validateTheatreCreateRequest } from "../middlewares/theatre.middleware";

const theatreRoutes = Router();

theatreRoutes.post("/", validateTheatreCreateRequest, createTheatre);
theatreRoutes.get("/:id", getTheatre);

export default theatreRoutes;