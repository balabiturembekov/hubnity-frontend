import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { apiUrl } from "@/shared/config/env";

interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedQueue: ((token: string | null) => void)[] = [];

const processQueue = (token: string | null) => {
  failedQueue.forEach((cb) => {
    cb(token);
  });
  failedQueue = [];
};

export const api = axios.create({
  baseURL: `${apiUrl}/api`,
  withCredentials: true,
  withXSRFToken: true,
});

api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | ExtendedAxiosRequestConfig
      | undefined;

    // Check if originalRequest exists
    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve) => {
          failedQueue.push((token: string | null) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            } else {
              resolve(Promise.reject(error));
            }
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = Cookies.get("refresh_token");
        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // Call your refresh endpoint (backend expects refreshToken)
        const { access_token, refresh_token: newRefreshToken } = (
          await axios.post(
            `${apiUrl}/api/auth/refresh`,
            { refreshToken },
            { withCredentials: true },
          )
        ).data;

        // Update cookies
        Cookies.set("access_token", access_token, { sameSite: "strict" });
        Cookies.set("refresh_token", newRefreshToken, { sameSite: "strict" });

        // Retry failed requests
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        processQueue(access_token);
        return api(originalRequest);
      } catch (err) {
        processQueue(null);
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
