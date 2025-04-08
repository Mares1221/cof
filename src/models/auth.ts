import { IAuth } from "@/interfaces/auth";
import { IPermission } from "@/interfaces/general";
import { IUser } from "@/interfaces/user";

export type IPerm = {
  code: string;
  isFull: boolean;
  isRead: boolean;
  isWrite: boolean;
  isRemove: boolean;
  isPrint: boolean;
  isExport: boolean;
};

export interface IOtp {
  otpMethod: string | null;
  phone: string | null;
  message: string | null;
  expiresAt?: string | null;
}

export class Auth implements IAuth {
  username?: string | null;
  password?: string | null;
  accessToken: string | null;
  session_scope: string | null;
  otp: IOtp;
  user: IUser | null;
  permissions?: IPermission[];
  perm?: IPerm[];

  constructor({
    username,
    password,
    accessToken,
    session_scope,
    otp,
    user,
    permissions,
    perm,
  }: IAuth) {
    this.username = username;
    this.password = password;
    this.accessToken = accessToken;
    this.session_scope = session_scope;
    this.otp = otp;
    this.user = user;
    this.permissions = permissions;
    this.perm = perm;
  }
}
