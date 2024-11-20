import { Router } from "express";
import { signup } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/signup", signup);

export default userRouter;
