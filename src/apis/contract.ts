import { IContract } from "@/interfaces/contract";
import { Contract } from "@/models/contract";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const { count, rows } = await httpRequest.get("/contract", data);

  return {
    count: count,
    rows: rows.map((item: IContract) => Contract.fromJson(item)),
  };
};

export const get = async (id: string) => {
  return httpRequest.get(`/contract/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/contract", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/contract/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/contract/${id}`);
};
