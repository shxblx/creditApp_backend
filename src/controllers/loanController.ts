import { Request, Response } from "express";
import {
  createLoan,
  getLoan,
  getLoanAdmin,
  updateLoan,
} from "../services/loanServices";

export const applyloan = async (req: Request, res: Response) => {
  try {
    const {
      userId,
      fullName,
      loanAmount,
      loanTenure,
      employmentStatus,
      reasonForLoan,
      employmentAddress,
    } = req.body;

    const loan = await createLoan(
      userId,
      fullName,
      loanAmount,
      loanTenure,
      employmentStatus,
      reasonForLoan,
      employmentAddress
    );

    if (!loan) {
      return res.status(400).json({ message: "Loan Application Failed" });
    }

    return res.status(200).json({
      message: "Applied Loan Successfully,Please wait for the Approval",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const fetchLoan = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const loan = await getLoan(userId);
    if (!loan) {
      res.status(400).json({ message: "No Loans" });
    }

    return res.status(200).json({ loans: loan });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const fetchLoanAdmin = async (req: Request, res: Response) => {
  try {
    const loan = await getLoanAdmin();
    console.log(loan);

    if (!loan) {
      res.status(400).json({ message: "No Loans" });
    }

    return res.status(200).json({
      loans: loan?.loans,
      totalLoans: loan?.totalLoans,
      totalDisbursed: loan?.totalDisbursedAmount,
      totalUsers: loan?.totalUsers,
      pendingLoans: loan?.pendingLoans,
      approvedLoans: loan?.approvedLoans,
      rejectedLoans: loan?.rejectedLoans,
      disbursedLoans: loan?.disbursedLoans,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { loanId, newStatus } = req.body;

    const updatedLoan = await updateLoan(loanId, newStatus);
    console.log(updatedLoan);

    if (!updatedLoan) {
      return res.status(400).json({ message: "Something Went Wrong" });
    }
    return res.status(200).json({ message: "Loan Updated" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
