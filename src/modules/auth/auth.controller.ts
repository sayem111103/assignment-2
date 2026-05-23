import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";

const signUp = async (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "user created successfully!",
  });
};

export const authController = { signUp };
