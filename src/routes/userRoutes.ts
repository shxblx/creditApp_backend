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
userRouter.post("/logout", logout);
userRouter.post("/adminLogout", adminLogout);
userRouter.post("/applyloan", applyloan);
userRouter.get("/fetchloan/:userId", fetchLoan);
userRouter.get("/fetchloanadmin", fetchLoanAdmin);
userRouter.post("/updatestatus", updateStatus);

export default userRouter;
