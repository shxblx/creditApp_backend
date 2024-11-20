import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "CreditApp",
    });
    console.log("Connected to database");
  } catch (error: any) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
