import { Document } from "mongoose";
import { IUser } from "../models/userModel";

export interface ICustomer extends Document {
  name: string;
  address: string;
  mobileNumber: string;
}

export interface ICheckUser {
  (email: string): Promise<IUser|null>;
}

export interface ICreateUser {
  (email: string, password: string, username: string): Promise<IUser | null>;
}
