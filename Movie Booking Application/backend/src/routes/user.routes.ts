import { Router } from "express";
import { createUser, resetPassword, signinUser, updateUserRoleOrStatus } from "../controllers/user.controllers";
import { validateResetPasswordRequest, validateSigninRequest, validateSignupRequest, validateUpdateUserRoleStatusRequest } from "../validators/user.validator";
import { verifyJwt } from "../middlewares/jwt.middleware";
import { validateObjectId } from "../middlewares/validateObjectId.middleware";

const authAdminRouter = Router();

authAdminRouter.post('/signup', validateSignupRequest, createUser);
authAdminRouter.post('/signin', validateSigninRequest, signinUser);
authAdminRouter.patch("/reset-password", verifyJwt, validateResetPasswordRequest, resetPassword);
authAdminRouter.patch("/:id", verifyJwt, validateObjectId, validateUpdateUserRoleStatusRequest, updateUserRoleOrStatus);

export default authAdminRouter;