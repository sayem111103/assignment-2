import type { Response } from "express";
type TResponse<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  errorMessage?: string;
  data?: T;
  error?: unknown;
  stack?: unknown;
};

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
  return res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    errorMessage: data?.errorMessage,
    data: data?.data,
    error: data?.error,
    stack: data?.stack,
  });
};

export default sendResponse;
