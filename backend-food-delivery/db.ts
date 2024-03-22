import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Successfully connected to Database");
  } catch (err) {
    console.error(err);
  }
};

