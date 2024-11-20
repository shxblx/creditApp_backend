import { Document } from "mongoose";
import { IUser } from "../models/userModel";
import { ILoanModel } from "../models/loanModel";

export interface ICustomer extends Document {
  name: string;
  address: string;
  mobileNumber: string;
}

export interface ICheckUser {
  (email: string): Promise<IUser | null>;
}

export interface ICreateUser {
  (email: string, password: string, username: string): Promise<IUser | null>;
}

export interface ICreateLoan {
  (
    userId: string,
    fullName: string,
    loanAmount: string,
    loanTenure: string,
    employmentStatus: string,
    reasonForLoan: string,
    employmentAddress: string
  ): Promise<ILoanModel | null>;
}
export interface IGetLoan {
  (userId: string): Promise<ILoanModel[] | null>;
}
