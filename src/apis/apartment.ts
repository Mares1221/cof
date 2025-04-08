import { IApartment } from "@/interfaces/apartment";
import { Apartment } from "@/models/apartment";
import { Result } from "@/models/result";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api");

export const list = async (data: any) => {
  const res = await httpRequest.get("/apartment", data);

  return Result.fromJson<IApartment>({
    rows: res?.rows?.map((row: IApartment) => Apartment.fromJson(row)),
    count: res?.count,
  });
};

export const get = async (id: string) => {
  const res = await httpRequest.get(`/apartment/${id}`);

  return Apartment.fromJson(res);
};

export const create = async (data: any) => {
  return httpRequest.post("/apartment", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/apartment/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/apartment/${id}`);
};
