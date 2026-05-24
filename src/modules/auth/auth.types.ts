export type TRoles = "contributor" | "maintainer";
export type TUser = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: TRoles;
};
export type TJwtPayload = Omit<TUser, "password">;
export type TLogin = Omit<TUser, "name" | "role">;
