import { Router } from "express";
import { createUser, resetPassword, signinUser } from "../controllers/user.controllers";
import { validateResetPasswordRequest, validateSigninRequest, validateSignupRequest } from "../validators/user.validator";
import { verifyJwt } from "../middlewares/jwt.middleware";

const authAdminRouter = Router();

authAdminRouter.post('/signup', validateSignupRequest, createUser);
authAdminRouter.post('/signin', validateSigninRequest, signinUser);
authAdminRouter.patch("/reset-password", verifyJwt, validateResetPasswordRequest, resetPassword);

export default authAdminRouter;