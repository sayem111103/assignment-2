import config from "../../config";
import { pool } from "../../db/db.connection";
import bcrypt from "bcrypt";
import type { TLogin, TRoles, TUser } from "./auth.types";
import ApiError from "../../error/ApiError";
import { StatusCodes } from "http-status-codes";
import { generateToken } from "../../utils/jwtToken";

const signUpIntoDB = async (payload: TUser) => {
  const { name, email, role, password } = payload;
  const hashedPassword = await bcrypt.hash(password, config.salt);
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1      
    `,
    [email],
  );
  if (userData?.rows?.length > 0) {
    throw new ApiError("User already exists", StatusCodes.CONFLICT);
  }
  const result = await pool.query(
    `
     INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'user')) 
     RETURNING *
    `,
    [name, email, hashedPassword, role],
  );
  if (result?.rows?.length === 0) {
    throw new ApiError("failed to create user", StatusCodes.BAD_REQUEST);
  }
  delete result?.rows[0]?.password;
  return result?.rows[0];
};

const login = async (payload: TLogin) => {
  const userData = await pool.query(
    `
    SELECT * FROM users WHERE email=$1      
    `,
    [payload?.email],
  );
  const { password, ...rest } = userData?.rows[0] as TUser;
  if (userData.rows.length === 0) {
    throw new ApiError(
      "Invalid Credentials User Not Found!!",
      StatusCodes.NOT_FOUND,
    );
  }
  const isPasswordValid = await bcrypt.compare(payload?.password, password);
  if (!isPasswordValid) {
    throw new ApiError("Wrong Password!!", StatusCodes.UNAUTHORIZED);
  }

  const jwtPayload = {
    id: rest.id as number,
    name: rest.name,
    role: rest.role as TRoles,
    email: rest.email,
  };
  const accessToken = generateToken(jwtPayload, "access", "2h");
  const refreshToken = generateToken(jwtPayload, "refresh", "1d");

  return { token: accessToken, refreshToken, user: rest };
};

export const authServices = { signUpIntoDB, login };
