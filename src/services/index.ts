import axios from "axios";
const AUTH_API_URL = import.meta.env.VITE_AUTH_API_URL;
import { AuthApi } from "./auth-service";
import { VarifyRefreshTokenResponse } from "../types";
import Cookies from "js-cookie";

export type ApiReturnType = {
  auth: ReturnType<typeof AuthApi>;
};

export const Api = (): ApiReturnType => {
  const instance = axios.create({
    baseURL: AUTH_API_URL,
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (config) => {
      const accessToken = Cookies.get("accessToken");
      if (accessToken) {
        config.headers["Authorization"] = "Bearer " + accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      if (originalConfig.url !== "/auth/login" && err.response) {
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;

          try {
            const { data } = await instance.post<VarifyRefreshTokenResponse>(
              "/auth/refresh-token",
              {
                refreshToken: Cookies.get("refreshToken"),
              }
            );
            Cookies.set("refreshToken", data.refresh_token, {
              path: "/",
              expires: data.refresh_token_expire,
            });
            Cookies.set("accessToken", data.access_token, {
              path: "/",
              expires: data.token_expire,
            });
            return instance(originalConfig);
          } catch (_error) {
            return Promise.reject(_error);
          }
        }
      }

      return Promise.reject(err);
    }
  );

  const apis = {
    auth: AuthApi,
  };

  const result = Object.entries(apis).reduce((prev, [key, f]) => {
    return {
      ...prev,
      [key]: f(instance),
    };
  }, {} as ApiReturnType);

  return result;
};
