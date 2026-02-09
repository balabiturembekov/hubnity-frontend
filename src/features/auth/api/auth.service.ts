import type { LoginReq, LoginRes } from "@/features/auth/model/auth.types";
import { api } from "@/shared/config/api";

class AuthService {
  async login(payload: LoginReq) {
    const res = await api.post<LoginRes>("/auth/login", payload);
    return res.data;
  }
}
export const authService = new AuthService();
