import { IAd } from "@/interfaces/ad";
import { Ad } from "@/models/ad";
import { Result } from "@/models/result";
import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/aut/api");

export const list = async (data: any) => {
  const res = await httpRequest.get("/ad", data);

  return Result.fromJson<IAd>({
    rows: res?.rows?.map((row: IAd) => Ad.fromJson(row)),
    count: res?.count,
  });
};

export const get = async (id: string) => {
  return httpRequest.get(`/ad/${id}/detail`);
};

export const create = async (data: any) => {
  return httpRequest.post("/ad", data);
};

export const update = async (id: string, data: any) => {
  return httpRequest.put(`/ad/${id}`, data);
};

export const remove = async (id: string) => {
  return httpRequest.del(`/ad/${id}`);
};
