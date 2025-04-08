import { HttpRequest } from "@/utils/request";
import { store } from "@/store";
import { setInit } from "@/store/general-slice";

const httpRequest = new HttpRequest(null, "/api");
const httpRequestMed = new HttpRequest(null, "/med");

export const upload = async (data: FormData | any) =>
  httpRequestMed.upload("/api/image/upload", data);

export const init = async () => {
  const res = await httpRequest.get("/general/init");
  store.dispatch(setInit(res));

  return res;
};
