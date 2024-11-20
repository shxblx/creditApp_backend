import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

config();

import connectDB from "./config/database";
import userRouter from "./routes/userRoutes";

connectDB();
const app = express();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRouter);

const port: string | number = process.env.PORT || 4040;

app.listen(port, () => {
  console.log(`server started running on port ${port}`);
});
