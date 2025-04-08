import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/med");

export const upload = async (data: FormData) => {
  const res = await httpRequest.upload(
    "/image/upload",
    data as unknown as { file: Blob },
  );
  return res;
};
