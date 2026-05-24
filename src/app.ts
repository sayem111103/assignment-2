import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import sendResponse from "./utils/sendResponse";
import CookieParser from "cookie-parser";
import router from "./routes/index.route";
import globalErrorHandler from "./middleware/globalErrorhandler";
import routeNotFound from "./utils/routeNotFound";
import cors from "cors";
import config from "./config";
const app: Application = express();

app.use(
  cors({
    origin: config.origin,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  }),
);
app.use(CookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);
app.get("/", (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "DevPulse server is running!",
  });
});

app.use(globalErrorHandler);
app.use(routeNotFound);

export default app;
