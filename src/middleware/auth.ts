import type { NextFunction, Request, Response } from "express";
import type { TRoles, TUser } from "../modules/auth/auth.types";
import ApiError from "../error/ApiError";
import { StatusCodes } from "http-status-codes";
import { verifyToken } from "../utils/jwtToken";
import { pool } from "../db/db.connection";

const auth = (...roles: TRoles[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(
          "You do not have the necessary permissions to access this resource.",
          StatusCodes.UNAUTHORIZED,
        );
      }

      let decode;
      decode = verifyToken(token, "access");
      const { email } = decode;
      const userData = await pool.query(
        `
          SELECT * FROM users WHERE email=$1   
          `,
        [email],
      );
      delete userData?.rows[0]?.password;
      if (userData?.rows?.length === 0) {
        throw new ApiError("user not found!!", StatusCodes.NOT_FOUND);
      }

      const { role } = userData?.rows[0] as TUser;
      if (roles && !roles.includes(role as TRoles)) {
        throw new ApiError(
          "You do not have the necessary permissions to access this resource.",
          StatusCodes.UNAUTHORIZED,
        );
      }
      req.user = decode;
      next();
    } catch (err) {
      throw new ApiError(
        "You do not have the necessary permissions to access this resource.",
        StatusCodes.UNAUTHORIZED,
      );
    }
  };
};

export default auth;
