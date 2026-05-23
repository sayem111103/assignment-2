import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  environment: process.env.ENVIRONMENT,
  db_connection: process.env.DB,
  port: process.env.PORT,
};

export default config;
