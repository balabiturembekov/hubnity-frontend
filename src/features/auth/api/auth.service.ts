import Cookies from "js-cookie";
import { useUserStore } from "@/entities/user";
import type {
  ChangePasswordReq,
  LoginReq,
  LoginRes,
  RegisterReq,
  RegisterRes,
} from "@/features/auth/model/auth.types";
import { api } from "@/shared/config/api";
import type { MessageRes } from "@/shared/model/types";

class AuthService {
  async login(payload: LoginReq) {
    const res = await api.post<LoginRes>("/auth/login", payload);
    return res.data;
  }

  async register(payload: RegisterReq) {
    const res = await api.post<RegisterRes>("/auth/register", payload);
    return res.data;
  }

  async logout() {
    const accessToken = Cookies.get("access_token");
    const refreshToken = Cookies.get("refresh_token");

    try {
      if (accessToken) {
        await api.post("/auth/logout", { refreshToken });
      } else if (refreshToken) {
        await api.post("/auth/logout-by-refresh-token", { refreshToken });
      }
    } catch (error) {
      console.error("API logout failed:", error);
    } finally {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      useUserStore.getState().clearUser();
    }
  }

  async changePassword(payload: ChangePasswordReq) {
    const res = await api.post<MessageRes>("/auth/change-password", payload);
    return res.data;
  }
}
export const authService = new AuthService();
