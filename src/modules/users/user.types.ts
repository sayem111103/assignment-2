export type TRoles = "contributor" | "maintainer";
export type TUser = {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: TRoles;
};
