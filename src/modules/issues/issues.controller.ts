import type { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { issuesServices } from "./issues.service";
import { StatusCodes } from "http-status-codes";

const createIssue = async (req: Request, res: Response) => {
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

export const issuesController = {
  createIssue,
};
