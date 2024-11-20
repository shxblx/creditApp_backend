import {
  ICreateLoan,
  IGetLoan,
  IGetLoanAdmin,
  IUpdateStatus,
} from "../interface/userServiceInterface";
import { LoanModel } from "../models/loanModel";

export const createLoan: ICreateLoan = async (
  userId: string,
  fullName: string,
  loanAmount: string,
  loanTenure: string,
  employmentStatus: string,
  reasonForLoan: string,
  employmentAddress: string
) => {
  try {
    const loan = new LoanModel({
      userId,
      fullName,
      loanAmount,
      loanTenure,
      employmentStatus,
      reasonForLoan,
      employmentAddress,
    });
    const newLoan = await loan.save();
    return newLoan;
  } catch (error) {
    return null;
  }
};

export const getLoan: IGetLoan = async (userId: string) => {
  try {
    const loan = await LoanModel.find({ userId });
    if (!loan) {
      return null;
    }
    return loan;
  } catch (error) {
    return null;
  }
};
export const getLoanAdmin: IGetLoanAdmin = async () => {
  try {
    const loan = await LoanModel.find();
    if (!loan) {
      return null;
    }
    return loan;
  } catch (error) {
    return null;
  }
};

export const updateLoan: IUpdateStatus = async (
  loanId: string,
  newStatus: string
) => {
  try {
    const loan = await LoanModel.findByIdAndUpdate(loanId, {
      loanStatus: newStatus,
    });
    if (!loan) {
      return null;
    }
    return loan;
  } catch (error) {
    return null;
  }
};
