import { Request, Response } from "express";
import { checkUser, createUser } from "../services/userServices";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const exist = await checkUser(email);
    if (exist) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await createUser(email, hashedPassword, username);

    const token = await generateToken({ userId: username, role: "user" });

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    return res
      .status(200)
      .json({ userId: user?._id, message: "SignUp Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;

    const user = await checkUser(email);

    if (!user) {
      return res.status(400).json({ message: "User Doesn't Exist" });
    }
    const passwordVerified = await bcrypt.compare(password, user.password);

    if (!passwordVerified) {
      return res.status(400).json({ message: "Password Doesn't match" });
    }

    if (user.isAdmin) {
      const token = await generateToken({
        userId: user.username,
        role: "admin",
      });
      res.cookie("adminJwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "none",
      });

      return res.status(200).json({
        isAdmin: true,
        message: "Welcome Admin",
      });
    }

    const token = await generateToken({ userId: user.username, role: "user" });
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });
    return res
      .status(200)
      .json({ userId: user?._id, message: "Login Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const logout = (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Logout Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const adminLogout = (req: Request, res: Response) => {
  try {
    res.cookie("adminJwt", "", {
      httpOnly: true,
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    return res.status(200).json({ message: "Admin Logout Success" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
