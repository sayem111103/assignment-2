import type { TUser } from "../users/user.types";

export type TJwtPayload = Omit<TUser, "password">;
export type TLogin = Omit<TUser, "name" | "role">;
