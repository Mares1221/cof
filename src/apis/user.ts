import { IUser } from "@/interfaces/user";
import { Result } from "@/models/result";
import { User } from "@/models/user";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const res = await httpRequest.get("/user", data);

  return Result.fromJson<IUser>({
    rows: res?.rows?.map((row: IUser) => User.fromJson(row)),
    count: res?.count,
  });
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/user/${id}`);

  return User.fromJson(res);
};

export const create = async (data: any) => {
  return httpRequest.post("/user", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/user/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/user/${id}`);
};

export const active = async (id: string) => {
  return httpRequest.put(`/user/${id}/active`);
};

export const addMember = async (data: any) => {
  return httpRequest.post("/user/add-member", data);
};

export const updateMember = async (id: string, data: any) => {
  return httpRequest.put(`/user/add-member/${id}`, data);
};
