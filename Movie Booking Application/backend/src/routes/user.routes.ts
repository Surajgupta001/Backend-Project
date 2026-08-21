import { Router } from "express";
import { createUser } from "../controllers/user.controllers";

const authAdminRouter = Router();

authAdminRouter.post('/signup', createUser);

export default authAdminRouter;