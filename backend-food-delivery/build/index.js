"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./db");
const userRouter_1 = require("./routes/userRouter");
const authRouter_1 = require("./routes/authRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 8800;
(0, db_1.db)();
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(userRouter_1.userRouter);
app.use("/auth", authRouter_1.authRouter);
app.get("/", (req, res) => {
    try {
        res.send("Get is success");
    }
    catch (error) {
        console.error("get error:", error);
    }
});
app.listen(PORT, () => {
    console.log("Apllication is running at: http://localhost:" + PORT);
});
