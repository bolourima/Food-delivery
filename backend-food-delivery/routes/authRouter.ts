import { Router } from "express";
import { refreshToken, signIn, signUp } from "../controller/authController";

export const authRouter = Router();

authRouter.route("/signup").post(signUp);
authRouter.route("/signin").post(signIn);
authRouter.route("/refresh").post(refreshToken);
