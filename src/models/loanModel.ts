import mongoose, { Schema, Document, Model } from "mongoose";

interface ILoanModel extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  loanAmount: string;
  loanTenure: string;
  employmentStatus: string;
  employmentAddress: string;
  reasonForLoan: string;
  loanStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

const LoanSchema = new Schema<ILoanModel>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    loanAmount: { type: String, required: true },
    loanTenure: { type: String, required: true },
    employmentStatus: { type: String, required: true },
    employmentAddress: { type: String, required: true },
    reasonForLoan: { type: String, required: true },
    loanStatus: { type: String, required: true, default: "Pending" },
  },
  {
    timestamps: true,
  }
);

const LoanModel = mongoose.model<ILoanModel>("Loan", LoanSchema);

export { LoanModel, ILoanModel };
