import { ICategory } from "@/interfaces/category";
import { Category } from "@/models/category";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const { count, rows } = await httpRequest.get("/category", data);

  return {
    count: count,
    rows: rows.map((item: ICategory) => Category.fromJson(item)),
  };
};

export const get = async (id: string) => {
  return httpRequest.get(`/category/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/category", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/category/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/category/${id}`);
};
