"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.get("/users", userController_1.getUsers).post("/users", userController_1.createUser);
