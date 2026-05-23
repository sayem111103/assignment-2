import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import config from "../config";

const globalErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  sendResponse(res, {
    statusCode: 500,
    success: false,
    message: error instanceof Error ? error.message : "Internal server error",
    stack:
      config.node_env === "development" && error instanceof Error
        ? error.stack
        : undefined,
  });
};

export default globalErrorHandler;
