import type { UserEntity } from "@/entities/user";

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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterRes {
  user: Omit<UserEntity, "createdAt" & "updatedAt">;
  access_token: string;
  refresh_token: string;
}

export interface ChangePasswordReq {
  currentPassword: string;
  newPassword: string;
}

export interface ForgotPasswordRes {
  message: string;
}

export interface ForgotPasswordReq {
  email: string;
}

export interface ResetPasswordRes {
  message: string;
}

export interface ResetPasswordReq {
  token: string;
  newPassword: string;
}

export interface RefreshRes {
  access_token: string;
  refresh_token: string;
}
