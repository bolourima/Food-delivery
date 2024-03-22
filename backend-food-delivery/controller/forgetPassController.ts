import { userModel } from "../models/userModel";
import express from "express";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

interface OtpMap {
  [key: string]: number;
}

let otpMap: OtpMap = {};

export const forgetPass = async (
  req: express.Request,
  res: express.Response
) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "bolorboloroo1127@gmail.com",
        pass: "ztrd ldkw zaba kfrh",
      },
    });
    const otp = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
    async function main() {
      const info = await transporter.sendMail({
        from: 'Pinecone Food delivery',
        to: req.body.email,
        subject: "Нууц үг сэргээх нэг удаагийн код явуулж байнаа",
        text: `Your password reset code is: ${otp}`,
        html: `<p>Your password reset code is: ${otp}</p>`,
      });
    }
    main().catch(console.error);
    otpMap[user.email] = otp;

    res.status(201).send(otpMap);
  } catch (error) {
    console.error("Error during forget passport. Message is:", error);
    res.status(400).json({ message: "Forget passport fail" });
  }
};

export const verifyOtp = (req: express.Request, res: express.Response) => {
  const { code, email } = req.body;
  console.log("frontin object", req.body);
  console.log("backiing object", otpMap);

  if (!otpMap[email]) {
    return res
      .status(400)
      .send("6 orontoi code ilgeesiimu mail chin taarku bnshde");
  }

  try {
    if (code === otpMap[email]) {
      res.status(201).send("otp code is right");
    }
  } catch (error) {
    console.error("otp code not match", error);
  }
};

export const resetPass = async (
  req: express.Request,
  res: express.Response
) => {
  console.log("req reset iii");
  const { email, newPassport } = req.body;
  if (!newPassport) {
    return res.status(400).send("passport hud bn");
  }
  try {
    const hashedPassport = await bcrypt.hash(newPassport, 10);
    const user = await userModel.findOne({ email });
    console.log("user", user);
    const userId = user?.id;
    console.log("userId", userId);
    await userModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { passport: hashedPassport } }
    );
    console.log("updated passport user", user);
    res.status(201).send("Successfully changed passport");
  } catch (error) {
    console.error("Error during reset passport. Message is:", error);
    res.status(400).json({ message: "Reset passport fail" });
  }
};
