import {
  ICreateLoan,
  IGetLoan,
  IGetLoanAdmin,
  IUpdateStatus,
} from "../interface/userServiceInterface";
import { LoanModel } from "../models/loanModel";
import User from "../models/userModel";

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
    const loans = await LoanModel.find({ userId });

    if (!loans || loans.length === 0) {
      return null;
    }

    const totalDisbursed = loans
      .filter((loan) => loan.loanStatus === "Disbursed")
      .reduce((total, loan) => total + parseFloat(loan.loanAmount), 0);

    return {
      loans,
      totalDisbursed,
    };
  } catch (error) {
    return null;
  }
};
export const getLoanAdmin: IGetLoanAdmin = async () => {
  try {
    const [
      loans,
      loanStats,
      pendingLoans,
      rejectedLoans,
      approvedLoans,
      disbursedLoans,
    ] = await Promise.all([
      LoanModel.find().sort({ createdAt: -1 }),
      LoanModel.aggregate([
        {
          $match: {
            loanStatus: { $in: ["Disbursed", "disbursed"] },
          },
        },
        {
          $group: {
            _id: null,
            totalLoans: { $sum: 1 },
            totalDisbursedAmount: {
              $sum: {
                $toDouble: {
                  $replaceAll: {
                    input: "$loanAmount",
                    find: ",",
                    replacement: "",
                  },
                },
              },
            },
          },
        },
      ]),
      LoanModel.countDocuments({
        loanStatus: { $in: ["Pending", "pending"] },
      }),
      LoanModel.countDocuments({
        loanStatus: { $in: ["Rejected", "rejected"] },
      }),
      LoanModel.countDocuments({
        loanStatus: { $in: ["Approved", "approved"] },
      }),
      LoanModel.countDocuments({
        loanStatus: { $in: ["Disbursed", "disbursed"] },
      }),
    ]);

    const totalLoansCount = await LoanModel.countDocuments();
    const totalUsers = await User.countDocuments();

    const disbursedStats = loanStats[0] || {
      totalLoans: 0,
      totalDisbursedAmount: 0,
    };

    return {
      loans,
      totalLoans: totalLoansCount,
      totalDisbursedAmount: disbursedStats.totalDisbursedAmount,
      totalUsers,
      pendingLoans,
      rejectedLoans,
      approvedLoans,
      disbursedLoans,
    };
  } catch (error) {
    console.error("Error in getLoanAdmin:", error);
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
