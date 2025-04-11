
import { IBackendRes } from "../types/interface.d";
import { Mutex } from "async-mutex";
import axiosClient, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { store } from "../redux/store";
import { setRefreshTokenAction } from "../redux/slice/accountSlide";


interface AccessTokenResponse {
  access_token: string;
}


const instance = axiosClient.create({
  baseURL: import.meta.env.VITE_MONGO_BE_URL as string ?? "http://localhost:8080", 
  withCredentials: true,
});

const mutex = new Mutex();
const NO_RETRY_HEADER = "x-no-retry";


const handleRefreshToken = async (): Promise<string | null> => {
  return await mutex.runExclusive(async () => {
    try {
      const res = await instance.get<IBackendRes<AccessTokenResponse>>("/auth/refresh");
      if (res && res.data) return res?.data?.data?.access_token ?? null;
      return null;
    } catch {
      return null;
    }
  });
};


instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const access_token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  if (!config.headers.Accept && config.headers["Content-Type"]) {
    config.headers.Accept = "application/json";
    config.headers["Content-Type"] = "application/json; charset=utf-8";
  }
  return config;
});


instance.interceptors.response.use(
  (res: AxiosResponse) => res.data,
  async (error) => {
    const originalRequest = error.config;

    
    if (
      error.response &&
      +error.response.status === 401 &&
      originalRequest.url !== "/auth/login" &&
      !originalRequest.headers[NO_RETRY_HEADER]
    ) {
      const access_token = await handleRefreshToken();
      originalRequest.headers[NO_RETRY_HEADER] = "true";
      if (access_token) {
        originalRequest.headers["Authorization"] = `Bearer ${access_token}`;
        localStorage.setItem("access_token", access_token);
        return instance.request(originalRequest);
      }
    }

    
    if (
      error.response &&
      +error.response.status === 400 &&
      originalRequest.url === "/auth/refresh" &&
      location.pathname.startsWith("/admin")
    ) {
      const message = error?.response?.data?.message ?? "Có lỗi xảy ra, vui lòng login.";
      store.dispatch(setRefreshTokenAction({ status: true, message }));
    }

    return Promise.reject(error?.response?.data ?? error);
  }
);

export default instance;
