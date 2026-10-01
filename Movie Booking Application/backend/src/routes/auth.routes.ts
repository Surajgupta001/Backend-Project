import { Router } from "express";
import { createUser, signinUser, resetPassword } from "../controllers/auth.controllers";
import { validateSignupRequest, validateSigninRequest, validateResetPasswordRequest } from "../validators/auth.validator";
import { verifyJwt } from "../middlewares/jwt.middleware";

const authRoutes = Router();

authRoutes.post("/signup", validateSignupRequest, createUser);
authRoutes.post("/signin", validateSigninRequest, signinUser);
authRoutes.patch("/reset-password", verifyJwt, validateResetPasswordRequest, resetPassword);

export default authRoutes;