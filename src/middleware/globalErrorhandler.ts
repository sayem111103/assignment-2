import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import config from "../config";
import { StatusCodes } from "http-status-codes";
import ApiError from "../error/ApiError";

const globalErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal server error";
  let errorMessage = error instanceof Error ? error.message : "";
  if (error instanceof ApiError) {
    statusCode = error?.statusCode;
    message = "Api Error";
    errorMessage = error?.message;
    if (error.statusCode === StatusCodes.UNAUTHORIZED) {
      statusCode = error?.statusCode;
      message = "Unauthorized Access";
      errorMessage = error?.message;
    }
  }
  sendResponse(res, {
    statusCode: statusCode,
    success: false,
    message: message,
    errorMessage: errorMessage,
    stack:
      config.node_env === "development" && error instanceof Error
        ? error.stack
        : undefined,
  });
};

export default globalErrorHandler;
