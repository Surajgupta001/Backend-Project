import { Router } from "express";
import { createUser, signinUser } from "../controllers/user.controllers";
import { validateSigninRequest, validateSignupRequest } from "../validators/user.validator";

const authAdminRouter = Router();

authAdminRouter.post('/signup', validateSignupRequest, createUser);
authAdminRouter.post('/signin', validateSigninRequest, signinUser);

export default authAdminRouter;