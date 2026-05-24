import { StatusCodes } from "http-status-codes";
import { pool } from "../../db/db.connection";
import ApiError from "../../error/ApiError";
import type { TIssue } from "./issues.types";

const createIssueIntoDB = async (payload: TIssue) => {
  const { title, description, type, reporter_id } = payload;
  const result = await pool.query(
    `
     INSERT INTO issues(title,description,type,reporter_id) VALUES($1,$2,$3,$4) 
     RETURNING *
    `,
    [title, description, type, reporter_id],
  );
  if (result?.rows?.length === 0) {
    throw new ApiError("failed to create issue", StatusCodes.BAD_REQUEST);
  }
  return result?.rows[0];
};

export const issuesServices = {
  createIssueIntoDB,
};
