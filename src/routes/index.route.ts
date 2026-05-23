import { Router } from "express";
import { authRoutes } from "../modules/auth/auth.route";

const router = Router();
const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
];

moduleRoutes.forEach((routeData) =>
  router.use(routeData.path, routeData.route),
);

export default router;
