import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

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
  const result = await authServices.login(data);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const authController = { signUp, login };
