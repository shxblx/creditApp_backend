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
      return res
        .status(401)
        .json({ message: "Access Denied: No Token Provided" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ message: "Token Expired" });
    }
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(403).json({ message: "Invalid Token" });
    }
    return res.status(500).json({ message: "Authentication Error" });
  }
}
