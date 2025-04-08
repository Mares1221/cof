import { HttpRequest } from "@/utils/request";

const httpRequest = new HttpRequest(null, "/aut");

export const otp = async (data: { otpMethod?: string; type: string }) => {
  return httpRequest.get("/otp/get", data);
};

export const verify = async (otp: { otpCode: string; otpMethod: "PHONE" }) => {
  return httpRequest.post("/otp/verify", otp);
};
