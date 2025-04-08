import { IComplex } from "@/interfaces/complex";
import { Complex } from "@/models/complex";
import { Result } from "@/models/result";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const res = await httpRequest.get("/complex", data);

  return Result.fromJson<IComplex>({
    rows: res?.rows?.map((row: IComplex) => Complex.fromJson(row)),
    count: res?.count,
  });
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/complex/${id}`);

  return Complex.fromJson(res);
};

export const create = async (data: any) => {
  return httpRequest.post("/complex", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/complex/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/complex/${id}`);
};
