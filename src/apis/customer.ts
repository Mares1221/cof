import { ICustomer } from "@/interfaces/customer";
import { Customer } from "@/models/customer";
import { Result } from "@/models/result";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const res = await httpRequest.get("/customer", data);

  return Result.fromJson<ICustomer>({
    rows: res?.rows?.map((row: ICustomer) => Customer.fromJson(row)),
    count: res?.count,
  });
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/customer/${id}`);

  return Customer.fromJson(res);
};

export const create = async (data: any) => {
  return httpRequest.post("/customer", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/customer/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/customer/${id}`);
};
