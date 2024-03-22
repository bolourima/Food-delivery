"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCar = exports.getCars = void 0;
const carModel_1 = require("../models/carModel");
const getCars = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield carModel_1.carModel.find();
    res.send(cars);
});
exports.getCars = getCars;
const createCar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield carModel_1.carModel.create({
        name: "200",
        color: "black",
        year: 2023,
        price: 2000000000,
    });
    res.send(car);
});
exports.createCar = createCar;
