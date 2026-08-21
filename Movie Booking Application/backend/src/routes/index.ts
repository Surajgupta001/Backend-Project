import { Router } from "express";
import movieRoutes from "./movie.routes";
import theatreRoutes from "./theatre.routes";
import authAdminRouter from "./user.routes";

const router = Router();

router.use("/movies", movieRoutes);
router.use("/theatres", theatreRoutes);
router.use("/auth", authAdminRouter);

export default router;
