import type { Request, RequestHandler, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { issuesServices } from "./issues.service";
import { StatusCodes } from "http-status-codes";
import type { TUser } from "../auth/auth.types";
import ApiError from "../../error/ApiError";

const createIssue: RequestHandler = async (req: Request, res: Response) => {
  const data = req.body;
  data.reporter_id = req?.user?.id;
  const result = await issuesServices.createIssueIntoDB(data);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Issue created successfully",
    data: result,
  });
};

const getAllIssue: RequestHandler = async (req: Request, res: Response) => {
  console.log(req.query);
};

const getSingleIssue: RequestHandler = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await issuesServices.getSingleIssueFromDB(Number(id));
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Issue retrived successfully",
    data: result,
  });
};

const updateIssue: RequestHandler = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const data = req.body;
  const result = await issuesServices.updateIssueFromDB(
    Number(id),
    data,
    req.user as TUser,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Issue updated successfully",
    data: result,
  });
};

const deleteIssue: RequestHandler = async (req: Request, res: Response) => {
  const id = req?.params?.id;
  const result = await issuesServices.deleteIssueFromDB(Number(id));
  if (result === 0) {
    throw new ApiError("failed to delete issue!", StatusCodes.BAD_REQUEST);
  }
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Issue deleted successfully",
  });
};

export const issuesController = {
  createIssue,
  getAllIssue,
  getSingleIssue,
  updateIssue,
  deleteIssue,
};
