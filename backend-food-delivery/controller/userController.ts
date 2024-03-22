import { userModel } from "../models/userModel";
import express from "express";
//controller deer - http request response avna
export const getUsers = async (req: express.Request, res: express.Response) => {
  const users = await userModel.find();
  res.send(users);
};

export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  const user = await userModel.create({
    name: "Bolormaa",
    email: "bolormaa@gmail.com",
    passport: "1234",
    phoneNumber: 88785579,
    role: "admin",
  });
  res.send(user);
};
