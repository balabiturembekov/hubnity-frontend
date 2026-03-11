import type { Timestamps } from "@/shared/model/types";

export type UserRole = "SUPER_ADMIN" | "USER";

export interface UserEntity extends Timestamps {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string | null;
}

export type PatchUserReq = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  avatar?: string | null;
};
