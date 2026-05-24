import { Router } from "express";
import { issuesController } from "./issues.controller";
import auth from "../../middleware/auth";
import { user_role } from "../auth/auth.const";

const router = Router();

router.post(
  "/",
  auth(user_role.contributor, user_role?.maintainer),
  issuesController.createIssue,
);

export const issuesRoutes = router;
