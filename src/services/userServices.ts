import { ICheckUser, ICreateUser } from "../interface/userServiceInterface";
import User, { IUser } from "../models/userModel";

export const checkUser: ICheckUser = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return null;
    }
    return user;
  } catch (error) {
    return null;
  }
};

export const createUser: ICreateUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const user = new User({ email, password, username });
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    return null;
  }
};
