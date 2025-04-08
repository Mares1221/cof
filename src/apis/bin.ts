import { IBin } from "@/interfaces/bin";
import { Bin } from "@/models/bin";

import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const { count, rows } = await httpRequest.get("/bin", data);

  return {
    count: count,
    rows: rows.map((item: IBin) => Bin.fromJson(item)),
  };
};

export const get = async (id: string) => {
  return httpRequest.get(`/bin/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/bin", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/bin/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/bin/${id}`);
};

export const wasteGarbage = async (id: string, data: any) => {
  return httpRequest.put(`/bin/${id}/load-garbage`, data);
};
