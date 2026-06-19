import { Router } from "express";
import * as userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.post('/register', userController.register);

userRouter.post('/login', userController.login);

export default userRouter;