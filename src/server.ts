import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "dotenv";

config();

import connectDB from "./config/database";
import userRouter from "./routes/userRoutes";

connectDB();
const app = express();
//https://creditappsh.vercel.app
//http://localhost:3000
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://creditappsh.vercel.app", "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Access-Control-Allow-Credentials"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

const port: string | number = process.env.PORT || 4040;

app.listen(port, () => {
  console.log(`server started running on port ${port}`);
});
