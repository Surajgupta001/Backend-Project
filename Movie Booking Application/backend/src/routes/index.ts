import { Router } from "express";
import movieRoutes from "./movie.routes";
import theatreRoutes from "./theatre.routes";
import userRoutes from "./user.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/movies", movieRoutes);
router.use("/theatres", theatreRoutes);
router.use("/auth", authRoutes);
router.use("/users", userRoutes);

export default router;