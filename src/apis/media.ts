import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/api/api");

export const upload = async (data: FormData) => {
  const res = await httpRequest.upload(
    "/media/image",
    data as unknown as { file: Blob }
  );
  return res;
};
