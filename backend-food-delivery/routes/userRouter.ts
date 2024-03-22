import { Router } from "express";
import { createUser, getUsers } from "../controller/userController";

const userRouter = Router();

userRouter.get("/users", getUsers).post("/users", createUser);

export { userRouter };
