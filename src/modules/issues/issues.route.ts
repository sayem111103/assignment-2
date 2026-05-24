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

router.get("/", issuesController.getAllIssue);

router.get("/:id", issuesController.getSingleIssue);

router.patch(
  "/:id",
  auth(user_role.maintainer, user_role.contributor),
  issuesController.updateIssue,
);
router.delete("/:id", auth(user_role.maintainer), issuesController.deleteIssue);
export const issuesRoutes = router;
