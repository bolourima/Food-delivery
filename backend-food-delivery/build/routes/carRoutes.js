"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carRouter = void 0;
const express_1 = require("express");
const carController_1 = require("../controller/carController");
const carRouter = (0, express_1.Router)();
exports.carRouter = carRouter;
carRouter.get("/cars", carController_1.getCars).post("/cars", carController_1.createCar);
