import axios from "axios";
import { useRouter } from "next/router";

export const instance = axios.create({
  baseURL: "http://localhost:8800",
  timeout: 5000,
  headers: { "Content-Type": "Application/json" },
});

export const createUser = async (data: {}, router: Function) => {
  console.log("data", data);
  try {
    const response = await instance.post("/auth/signup", data);
    console.log("response", response);
    console.log("response.data", response.data);
    console.log("response.status", response.status);
    if (response.status == 201) {
      router("/");
    }
  } catch (error) {
    console.error("Failed to Create User");
    return alert("Хэрэглэгч үүсгэхэд алдаа гарлаа");
  }
};

export const loginUser = async (data: {}, router: Function) => {
  console.log("data", data);
  try {
    const response = await instance.post("/auth/signin", data);
    console.log("response", response);
    console.log("response.data", response.data);
    console.log("response.status", response.status);
    if (response.status == 200) {
      router("/");
    }
  } catch (error) {
    return alert("Эмайл хаяг эсвэл нууц үг буруу байна");
  }
};

// let otpMap = "";

export const forgetPassport = async (data: {}, setStep: Function) => {
  console.log("data", data);
  try {
    const response = await instance.post("/forgetpass", data);
    // console.log("response", response);
    console.log("response.data", response.data);
    // console.log("response.status", response.status);
    if (response.status == 201) {
      return setStep(2);
    }
  } catch (error) {
    return alert("Эмайл хаяг буруу байна");
  }
  console.log;
};

export const verifyOtp = async (otpMap: {}, setStep: Function) => {
  // console.log("data", otpMap);
  try {
    const response = await instance.post("/verifyotp", otpMap);
    console.log("response", response);
    console.log("response.data", response.data);
    console.log("response.status", response.status);
    if (response.status == 201) {
      return setStep(3);
    }
  } catch (error) {
    return alert("Таны оруулсан 6 оронтой код буруу байна");
  }
};

export const newPassport = async (newPass: {}, router: Function) => {
  try {
    console.log(newPass);
    const response = await instance.put("/resetpass", newPass);
    console.log("response", response);
    console.log("response.data", response.data);
    console.log("response.status", response.status);
    if (response.status == 201) {
      router("/");
    }
  } catch (error) {
    return alert("Нууц үг сэргээх явцад алдаа гарлаа");
  }
};
