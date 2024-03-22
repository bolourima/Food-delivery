import express from "express";
import cors from "cors";
import { db } from "./db";
import { userRouter } from "./routes/userRouter";
import { authRouter } from "./routes/authRouter";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { forgetPassRouter, verifyOtpRouter } from "./routes/forgetPassRouter";

dotenv.config();

const app = express();

const PORT = 8800;
db();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(userRouter);
app.use(forgetPassRouter);
app.use(verifyOtpRouter);

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  try {
    res.send("Get is success");
  } catch (error) {
    console.error("get error:", error);
  }
});

app.listen(PORT, () => {
  console.log("Apllication is running at: http://localhost:" + PORT);
});
