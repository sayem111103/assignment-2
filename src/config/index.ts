import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

const config = {
  node_env: process.env.NODE_ENV,
  origin: process.env.ORIGIN,
  db_connection: process.env.DB,
  port: process.env.PORT,
  salt: Number(process.env.SALT),
  access: process.env.ACCESSSECRET,
  refresh: process.env.REFRESHSECRET,
};

export default config;
