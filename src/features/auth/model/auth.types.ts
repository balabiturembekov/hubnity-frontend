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

export interface RegisterReq {
  name: string;
  email: string;
  companyName: string;
  companyDomain: string;
  password: string;
  // confirmPassword: string; TODO: Uncomment after fixing on backend
}

export interface RegisterRes {
  user: Omit<UserEntity, "createdAt" & "updatedAt">;
  access_token: string;
  refresh_token: string;
}

export interface ChangePasswordReq {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
