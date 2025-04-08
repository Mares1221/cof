import { IInventory } from "@/interfaces/inventory";
import { Inventory } from "@/models/inventory";
import { Result } from "@/models/result";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const res = await httpRequest.get("/inventory", data);

  return Result.fromJson<IInventory>({
    rows: res?.rows?.map((row: IInventory) => Inventory.fromJson(row)),
    count: res?.count,
  });
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/inventory/${id}`);

  return Inventory.fromJson(res);
};

export const create = async (data: any) => {
  return httpRequest.post("/inventory", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/inventory/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/inventory/${id}`);
};
