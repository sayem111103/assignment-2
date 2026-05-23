import jwt, { type JwtPayload } from "jsonwebtoken";
import type ms from "ms";
import type { TJwtPayload } from "../modules/auth/auth.types";
import config from "../config";

export const generateToken = (
  jwtPayload: TJwtPayload,
  type: "access" | "refresh",
  expiresIn: ms.StringValue,
) => {
  const secret = type === "refresh" ? config.refresh : config.access;
  return jwt.sign(jwtPayload, secret as string, {
    expiresIn,
  });
};

export const verifyToken = (token: string, type: "access" | "refresh") => {
  const secret = type === "refresh" ? config.refresh : config.access;
  const decoded = jwt.verify(token, secret as string) as JwtPayload;
  return decoded;
};
