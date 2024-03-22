"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carModel = void 0;
// const mongoose = require("mongoose");
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
// const { Schema } = mongoose;
exports.carModel = mongoose_1.default.model("Car", new mongoose_2.Schema({ name: String, color: String, year: Number, price: Number }));
