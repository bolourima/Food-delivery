import { Router } from "express";
import {
  forgetPass,
  resetPass,
  verifyOtp,
} from "../controller/forgetPassController";

export const forgetPassRouter = Router();

forgetPassRouter.route("/forgetpass").post(forgetPass);

export const verifyOtpRouter = Router();

forgetPassRouter.route("/verifyotp").post(verifyOtp);

export const resetPassRouter = Router();

forgetPassRouter.route("/resetpass").put(resetPass);
