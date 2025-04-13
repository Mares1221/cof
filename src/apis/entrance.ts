import { ICustomer } from "@/interfaces/customer";
import { Customer } from "@/models/customer";
import { Entrance } from "@/models/entrance";
import { Result } from "@/models/result";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/aut/api");

export const list = async (data: any) => {
  const res = await httpRequest.get("/entrance", data);

  return Result.fromJson<ICustomer>({
    rows: res?.rows?.map((row: ICustomer) => Customer.fromJson(row)),
    count: res?.count,
  });
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/entrance/${id}`);

  return Entrance.fromJson(res);
};

export const create = async (data: any) => {
  return httpRequest.post("/entrance", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/entrance/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/entrance/${id}`);
};
