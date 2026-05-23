import config from "../../config";
import { pool } from "../../db/db.connection";
import type { TUser } from "../users/user.types";
import bcrypt from "bcrypt";
const signUpIntoDB = async (payload: TUser) => {
  const { name, email, role, password } = payload;
  const hashedPassword = await bcrypt.hash(password, config.salt);
  const result = await pool.query(
    `
     INSERT INTO users(name,email,password,role) VALUES($1,$2,$3,COALESCE($4,'user')) 
     RETURNING *
    `,
    [name, email, hashedPassword, role],
  );
  delete result?.rows[0]?.password;
  return result?.rows[0];
};

export const authServices = { signUpIntoDB };
