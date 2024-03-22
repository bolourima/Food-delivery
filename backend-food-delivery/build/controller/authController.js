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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.signIn = exports.signUp = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtPrivateKey = process.env.JWT_SECRET_KEY;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, passport, phoneNumber, role } = req.body;
    try {
        const hashedPassport = yield bcrypt_1.default.hash(passport, 10);
        console.log("hashed passport", hashedPassport);
        const createUser = yield userModel_1.userModel.create({
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
    }
    catch (error) {
        console.error("Error during create user. Message is:", error);
        res.status(400).json({ message: "User creation failed" });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, passport } = req.body;
    try {
        const user = yield userModel_1.userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email not found" });
        }
        const checkPassport = yield bcrypt_1.default.compare(passport, user.passport);
        if (!checkPassport) {
            return res.status(400).json({ message: "Passport not match" });
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, jwtPrivateKey, {
            expiresIn: "1h",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, jwtPrivateKey, {
            expiresIn: "1d",
        });
        res
            .status(200)
            .cookie("refreshToken", refreshToken)
            .header({ Authorization: accessToken })
            .send(user);
        // res.status(200).json({ message: "User sign in successfully", accessToken });
    }
    catch (error) {
        console.error("Error during signin user. Message is:", error);
        res.status(400).json({ message: "User signin failder" });
    }
});
exports.signIn = signIn;
const refreshToken = (req, res) => {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
        return res.status(400).json({ message: "Access denied" });
    }
    console.log("Refresh token", refreshToken);
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, jwtPrivateKey);
        req.user = decoded.userId;
        console.log("decoded from refresh", decoded);
        const accessToken = jsonwebtoken_1.default.sign({ userId: decoded.user }, jwtPrivateKey, {
            expiresIn: "1h",
        });
        res.status(200).header("Authorization", accessToken).send(decoded.user);
    }
    catch (error) {
        console.error("Token verify error: ", error);
        res.status(400).json({ message: "Token is not valid" });
    }
};
exports.refreshToken = refreshToken;
