import type { UserEntity } from "@/entities/user/model/user.types";

export interface LoginReq {
  email: string;
  password: string;
}

export interface LoginRes {
  user: Omit<UserEntity, "createdAt" & "updatedAt"> & {
    company: {
      id: string;
      name: string;
    };
  };
  access_token: string;
  refresh_token: string;
}
