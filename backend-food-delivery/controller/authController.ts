import { userModel } from "../models/userModel";
import { Request, Response } from "express";
import express from "express";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IReq } from "../utils/interface";
import dotenv from "dotenv";
dotenv.config();

const jwtPrivateKey = process.env.JWT_SECRET_KEY;

export const signUp = async (req: express.Request, res: express.Response) => {
  const { name, email, passport, phoneNumber, role } = req.body;

  try {
    const hashedPassport = await bcrypt.hash(passport, 10);
    console.log("hashed passport", hashedPassport);
    const createUser = await userModel.create({
      name,
      email,
      passport: hashedPassport,
      phoneNumber,
      role,
    });
    console.log("Create user", createUser);
    res
      .status(201)
      .json({ message: `${createUser.email} user created successfully` });
  } catch (error) {
    console.error("Error during create user. Message is:", error);
    res.status(400).json({ message: "User creation failed" });
  }
};

export const signIn = async (req: express.Request, res: express.Response) => {
  const { email, passport } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }
    const checkPassport = await bcrypt.compare(passport, user.passport);
    if (!checkPassport) {
      return res.status(400).json({ message: "Passport not match" });
    }

    const accessToken = jwt.sign({ id: user._id }, jwtPrivateKey as string, {
      expiresIn: "1h",
    });

    const refreshToken = jwt.sign({ id: user._id }, jwtPrivateKey as string, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .cookie("refreshToken", refreshToken)
      .header({ Authorization: accessToken })
      .send(user);
    // res.status(200).json({ message: "User sign in successfully", accessToken });
  } catch (error) {
    console.error("Error during signin user. Message is:", error);
    res.status(400).json({ message: "User signin failder" });
  }
};

export const refreshToken = (req: IReq, res: express.Response) => {
  const refreshToken = req.cookies["refreshToken"];

  if (!refreshToken) {
    return res.status(400).json({ message: "Access denied" });
  }
  console.log("Refresh token", refreshToken);
  try {
    const decoded = jwt.verify(
      refreshToken,
      jwtPrivateKey as string
    ) as JwtPayload;
    req.user = decoded.userId;

    console.log("decoded from refresh", decoded);

    const accessToken = jwt.sign(
      { userId: decoded.user },
      jwtPrivateKey as string,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).header("Authorization", accessToken).send(decoded.user);
  } catch (error) {
    console.error("Token verify error: ", error);
    res.status(400).json({ message: "Token is not valid" });
  }
};
