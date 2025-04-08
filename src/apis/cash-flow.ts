import { ICashFlow } from "@/interfaces/cash-flow";
import { CashFlow } from "@/models/cash-flow";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const { count, rows } = await httpRequest.get("/cash-flow", data);

  return {
    count: count,
    rows: rows.map((item: ICashFlow) => CashFlow.fromJson(item)),
  };
};

export const get = async (id: string) => {
  return httpRequest.get(`/cash-flow/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/cash-flow", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/cash-flow/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/cash-flow/${id}`);
};
