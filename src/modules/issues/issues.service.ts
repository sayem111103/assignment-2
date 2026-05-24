import { StatusCodes } from "http-status-codes";
import { pool } from "../../db/db.connection";
import ApiError from "../../error/ApiError";
import type { TIssue } from "./issues.types";
import type { TUser } from "../auth/auth.types";

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

const getAllIssueFromDB = async (query: Record<string, unknown>) => {
  const issuesResult = await pool.query(`
    SELECT * FROM issues
    ${query?.sort ? `ORDER BY created_at ${query.sort === "newest" ? "DESC" : "ASC"}` : "ORDER BY created_at ASC"}
  `);

  const issues = issuesResult?.rows || [];
  if (issues.length === 0) return [];

  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];

  const usersResult = await pool.query(
    `SELECT id, name, role FROM users WHERE id = ANY($1)`,
    [reporterIds],
  );

  const userMap = new Map(usersResult?.rows.map((user) => [user.id, user]));
  return issues.map((issue) => {
    const { reporter_id, ...issueRest } = issue;
    const user = userMap.get(reporter_id);

    return {
      ...issueRest,
      reporter: user
        ? {
            id: user.id,
            name: user.name,
            role: user.role,
          }
        : null,
    };
  });
};

const getSingleIssueFromDB = async (id: number) => {
  const issueData = await pool.query(
    `
    SELECT * FROM issues WHERE id=$1      
    `,
    [id],
  );
  if (issueData?.rows?.length === 0) {
    throw new ApiError("issue not found!!", StatusCodes.NOT_FOUND);
  }
  const { reporter_id, created_at, updated_at, ...rest } = issueData
    ?.rows[0] as TIssue;
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE id=$1  
    `,
    [reporter_id],
  );
  if (userData?.rows?.length === 0) {
    throw new ApiError("user not found!!", StatusCodes.NOT_FOUND);
  }
  const { id: userId, name, role } = userData?.rows[0] as TUser;
  const sendData = {
    ...rest,
    reporter: {
      id: userId,
      name: name,
      role: role,
    },
    created_at,
    updated_at,
  };

  return sendData;
};

const updateIssueFromDB = async (
  id: number,
  payload: Partial<TIssue>,
  user: TUser,
) => {
  const { title, description, type, status } = payload;

  let result;

  const issue = await pool.query(
    `
    SELECT * FROM issues WHERE id=$1  
    `,
    [id],
  );

  if (issue?.rows?.length === 0) {
    throw new ApiError("issue not found!", StatusCodes.NOT_FOUND);
  }

  const { status: checkStatus } = issue?.rows[0] as TIssue;

  if (user.role === "contributor" && checkStatus !== "open") {
    throw new ApiError(
      "You are not authorized to update this issue!",
      StatusCodes.UNAUTHORIZED,
    );
  }

  if (user.role === "contributor" && checkStatus === "open") {
    result = await pool.query(
      `
      UPDATE issues 
      SET 
      title=COALESCE($1,title),
      description=COALESCE($2,description),
      type=COALESCE($3,type),
      status=COALESCE($4,status) ,
      updated_at=COALESCE($5,updated_at)
  
      WHERE id=$6 RETURNING *
      `,
      [title, description, type, status, new Date(), id],
    );
  } else {
    result = await pool.query(
      `
      UPDATE issues 
      SET 
      title=COALESCE($1,title),
      description=COALESCE($2,description),
      type=COALESCE($3,type),
      status=COALESCE($4,status),
      updated_at=COALESCE($5,updated_at)
  
      WHERE id=$6 RETURNING *
      `,
      [title, description, type, status, new Date(), id],
    );
  }
  if (result?.rows?.length === 0) {
    throw new ApiError("failed to update issue", StatusCodes.BAD_REQUEST);
  }
  delete result?.rows[0]?.password;
  return result?.rows[0];
};

const deleteIssueFromDB = async (id: number) => {
  const find = await pool.query(
    `
    SELECT * FROM issues WHERE id=$1  
      `,
    [id],
  );
  if (find?.rows?.length === 0) {
    throw new ApiError("issue not found!", StatusCodes.NOT_FOUND);
  }
  const result = await pool.query(
    `
    DELETE FROM issues WHERE id=$1  
      `,
    [id],
  );
  return result?.rowCount;
};

export const issuesServices = {
  createIssueIntoDB,
  getAllIssueFromDB,
  getSingleIssueFromDB,
  updateIssueFromDB,
  deleteIssueFromDB,
};
