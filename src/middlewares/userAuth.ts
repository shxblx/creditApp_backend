import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;

interface JwtPayload {
  userId: string;
  role: string;
}

export function userAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.cookies.jwt;
    console.log(token);

    if (!token) {
      return res.status(401).json("Access Denied: No Token Provided");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    next();
  } catch (error) {
    return res.status(403).json("Invalid or Expired Token");
  }
}
