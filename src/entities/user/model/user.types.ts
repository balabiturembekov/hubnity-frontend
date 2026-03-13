import type { Timestamps } from "@/shared/model/types";

export type UserRole = "SUPER_ADMIN" | "USER";

export interface UserEntity extends Timestamps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: string | null;
  deletedAt: string;
  role: UserRole;
  resetPasswordToken: string | null;
  resetPasswordExpires: string | null;
}

export type PatchUserReq = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?: string | null;
};
