import axios from "axios";
import Cookies from "js-cookie";
import { apiUrl } from "@/shared/config/env";

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
