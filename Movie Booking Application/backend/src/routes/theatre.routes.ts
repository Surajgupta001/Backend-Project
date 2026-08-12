import { Router } from "express";
import { createTheatre, deleteTheatre, getAllTheatres, getTheatre } from "../controllers/theatre.controllers";
import { validateTheatreCreateRequest } from "../middlewares/theatre.middleware";

const theatreRoutes = Router();

theatreRoutes.post("/", validateTheatreCreateRequest, createTheatre);
theatreRoutes.get("/", getAllTheatres);
theatreRoutes.get("/:id", getTheatre);
theatreRoutes.delete("/:id", deleteTheatre);

export default theatreRoutes;