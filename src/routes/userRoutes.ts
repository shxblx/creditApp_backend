import { Router } from "express";
import {
  adminLogout,
  login,
  logout,
  signup,
} from "../controllers/userController";
import { userAuth } from "../middlewares/userAuth";
import {
  applyloan,
  fetchLoan,
  fetchLoanAdmin,
  updateStatus,
} from "../controllers/loanController";
import { adminAuth } from "../middlewares/adminAuth";

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", userAuth, logout);
userRouter.post("/adminLogout", adminLogout);
userRouter.post("/applyloan", userAuth, applyloan);
userRouter.get("/fetchloan/:userId", userAuth, fetchLoan);
userRouter.get("/fetchloanadmin", fetchLoanAdmin);
userRouter.post("/updatestatus", updateStatus);

export default userRouter;
