import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";
import { issuesRoutes } from "../modules/issues/issues.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/issues",
    route: issuesRoutes,
  },
];

moduleRoutes.forEach((routeData) =>
  router.use(routeData.path, routeData.route),
);

export default router;
