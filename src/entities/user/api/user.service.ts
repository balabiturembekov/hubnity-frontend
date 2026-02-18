import type { PatchUserReq, UserEntity } from "@/entities/user";
import { api } from "@/shared/config/api";

class UserService {
  async getMe() {
    const res = await api.get<UserEntity>("/users/me");
    return res.data;
  }

  async updateMyProfile(data: PatchUserReq) {
    const res = await api.patch<UserEntity>("/users/me", data);
    return res.data;
  }

  async getAll() {
    const res = await api.get<UserEntity[]>("/users");
    return res.data;
  }

  async createEmployee(data: PatchUserReq) {
    const res = await api.post<UserEntity>("/users", data);
    return res.data;
  }

  async updateEmployee(id: string, data: PatchUserReq) {
    const res = await api.patch<UserEntity>(`/users/${id}`, data);
    return res.data;
  }

  async deleteEmployee(id: string) {
    const res = await api.delete(`/users/${id}`);
    return res.data;
  }

  async getUserDetails(id: string) {
    const res = await api.get<UserEntity>(`/users/${id}`);
    return res.data;
  }
}

export const userService = new UserService();
