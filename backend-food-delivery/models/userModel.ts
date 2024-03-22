import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";

export const userModel = mongoose.model(
  "User",
  new Schema({
    name: { type: String, required: [true, "Please enter your name"] },
    email: {
      type: String,
      unique: true,
      required: [true, "Please enter your Email"],
    },
    passport: {
      type: String,
      minlength: 4,
      required: [true, "Please enter your passport"],
    },
    phoneNumber: {
      type: Number,
      minlength: 8,
      maxlength: 8,
    },
    address: {
      type: String,
      maxlength: 30,
    },
    role: {
      type: String,
      role: ["admin", "user"],
      default: "user",
    },
    createdAt: { type: Date, default: new Date() },
  })
);
