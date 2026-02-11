import { api } from "@/shared/config/api";
import type { PatchUserReq, UserEntity } from "../model/user.types";

class UserService {
  async getMe() {
    const res = await api.get<UserEntity>("/users/me");
    return res.data;
  }

  async updateMyProfile(data: PatchUserReq) {
    const res = await api.patch<UserEntity>("/users/me", data);
    return res.data;
  }
}

export const userService = new UserService();
