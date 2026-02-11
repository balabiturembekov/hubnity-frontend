import type { Timestamps } from "@/shared/model/types";

export type UserRole = "employee" | "admin" | "OWNER" | "SUPER_ADMIN";
export type UserStatus = "ACTIVE" | "INACTIVE";

export interface UserEntity extends Timestamps {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string | null;
  hourlyRate: number;
  companyId: string;
}

export type PatchUserReq = {
  name?: string;
  email?: string;
  password?: string;
  role?: UserRole;
  status?: UserStatus;
  avatar?: string | null;
  hourlyRate?: number;
};
