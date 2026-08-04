import { Router } from "express";
import { createTheatre } from "../controllers/theatre.controllers";
import { validateTheatreCreateRequest } from "../middlewares/theatre.middleware";

const theatreRoutes = Router();

theatreRoutes.post("/", validateTheatreCreateRequest, createTheatre);

export default theatreRoutes;