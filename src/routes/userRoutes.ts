import { Router } from "express";
import {
  adminLogout,
  login,
  logout,
  signup,
} from "../controllers/userController";
import { userAuth } from "../middlewares/userAuth";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/adminLogout", adminLogout);

export default userRouter;
