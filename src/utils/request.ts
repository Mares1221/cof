import { store } from "../store";
import { logout } from "@/store/auth-slice";
import { HttpHandler } from "@/utils/http/http-handler";
import { HttpRequest as BaseHttpRequest } from "@/utils/http/http-request";

export class HttpRequest extends BaseHttpRequest {
  store = store;
  errorHandler = (statusCode: number, error: HttpHandler): HttpHandler => {
    if (statusCode === 401) {
      store.dispatch(logout());
    }
    throw error as any;
  };
}
