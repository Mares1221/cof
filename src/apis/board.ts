import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/aut/api");

export const list = async (data: any) => {
  return httpRequest.get("/board", data);
};
