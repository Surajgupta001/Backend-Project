import { Router } from "express";
import movieRoutes from "./movie.routes";
import theatreRoutes from "./theatre.routes";

const router = Router();

router.use("/movies", movieRoutes);
router.use("/theatres", theatreRoutes);

export default router;
