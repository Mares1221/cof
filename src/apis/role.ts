import { IRole } from "@/interfaces/role";
import { Result } from "@/models/result";
import { Role } from "@/models/role";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const res = await httpRequest.get("/role", data);

  return Result.fromJson<IRole>({
    rows: res?.rows?.map((row: IRole) => Role.fromJson(row)),
    count: res?.count,
  });
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/role/${id}`);

  return Role.fromJson(res);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/role/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/role", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/role/${id}`, data);
};
