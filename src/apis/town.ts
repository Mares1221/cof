import { IBuilding } from "@/interfaces/building";
import { Building } from "@/models/building";
import { Result } from "@/models/result";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/aut/api");

export const list = async (data: any) => {
  const res = await httpRequest.get("/town", data);

  return Result.fromJson<IBuilding>({
    rows: res?.rows?.map((row: IBuilding) => Building.fromJson(row)),
    count: res?.count,
  });
};

export const get = async (id: string) => {
  return httpRequest.get(`/town/${id}`);
};

export const create = async (data: any) => {
  return httpRequest.post("/town", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/town/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/town/${id}`);
};
