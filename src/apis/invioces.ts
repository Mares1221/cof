import { IInvoice } from "@/interfaces/invoice";
import { Invoice } from "@/models/invioce";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const { count, rows } = await httpRequest.get("/invoice", data);

  return {
    count: count,
    rows: rows.map((item: IInvoice) => Invoice.fromJson(item)),
  };
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/invoice/${id}`);

  return Invoice.fromJson(res);
};

export const create = async (data: any) => {
  return httpRequest.post("/invoice", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/invoice/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/invoice/${id}`);
};

export const initInvoices = async (data: any) => {
  const { count, rows } = await httpRequest.get("/invoice/init", data);

  return {
    count: count,
    rows: rows.map((item: IInvoice) => Invoice.fromJson(item)),
  };
};
