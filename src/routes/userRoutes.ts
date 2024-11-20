import { Router } from "express";
import {
  adminLogout,
  login,
  logout,
  signup,
} from "../controllers/userController";
import { userAuth } from "../middlewares/userAuth";
import { applyloan, fetchLoan } from "../controllers/loanController";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.post("/adminLogout", adminLogout);
userRouter.post("/applyloan", userAuth, applyloan);
userRouter.get("/fetchloan/:userId", userAuth, fetchLoan);

export default userRouter;
