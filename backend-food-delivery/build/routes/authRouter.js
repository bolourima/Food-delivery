"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = require("express");
const authController_1 = require("../controller/authController");
exports.authRouter = (0, express_1.Router)();
exports.authRouter.route("/signup").post(authController_1.signUp);
exports.authRouter.route("/signin").post(authController_1.signIn);
exports.authRouter.route("/refresh").post(authController_1.refreshToken);
