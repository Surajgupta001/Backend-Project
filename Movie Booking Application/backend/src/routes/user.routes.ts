import { Router } from "express";
import { validateUpdateUserRoleStatusRequest } from "../validators/user.validator";
import { updateUserRoleOrStatus } from "../controllers/user.controllers";
import { verifyJwt } from "../middlewares/jwt.middleware";
import { isAdmin } from "../middlewares/auth.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";

const userRoutes = Router();

userRoutes.patch("/:id", verifyJwt, isAdmin, validateObjectId, validateUpdateUserRoleStatusRequest, updateUserRoleOrStatus);

export default userRoutes;