import type { TIssue } from "./issues.types";

const createIssueIntoDB = async (payload: TIssue) => {
  console.log(payload);
};

export const issuesServices = {
  createIssueIntoDB,
};
