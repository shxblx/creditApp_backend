import { Request, Response } from "express";
import { checkUser, createUser } from "../services/userServices";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const exist = await checkUser(email);
    if (exist) {
      return res.status(400).json("User Already Exist");
    }

    await createUser(email, password, username);

    return res.status(200).json("SignUp Success");
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
