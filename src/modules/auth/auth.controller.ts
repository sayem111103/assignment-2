import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";
import config from "../../config";

const signUp = async (req: Request, res: Response) => {
  const data = req.body;
  const result = await authServices.signUpIntoDB(data);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

const login = async (req: Request, res: Response) => {
  const data = req.body;
  const { refreshToken, ...rest } = await authServices.login(data);
  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "lax",
  });
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: rest,
  });
};

export const authController = { signUp, login };
