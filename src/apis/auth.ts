import { HttpRequest } from "@/utils/request";
import { store } from "@/store";
import { authMe } from "@/store/auth-slice";

const httpRequest = new HttpRequest(null, "/aut");
const httpRequestUser = new HttpRequest(null, "/api");

export const me = async () => {
  const res = await httpRequest.get("/auth/me");
  store.dispatch(authMe(res));
  return res;
};

export const userMe = async () => {
  const res = await httpRequestUser.get("/auth/me");
  store.dispatch(authMe(res));
  return res;
};

export const login = async (data: {
  provider: string;
  email: string;
  password: string;
}) => {
  const res = await httpRequest.post("/auth/login", data);
  return res;
};

export const forgot = async (data: { phone: string; provider: string }) => {
  return httpRequest.post("/auth/forgot", data);
};

export const checkPassword = async (password: any) => {
  return httpRequest.post("/auth/check-password", password);
};

export const changePassword = async (data: {
  oldPassword?: string;
  password: string;
}) => {
  const res = await httpRequest.post("/auth/change-password", data);
  return res;
};
