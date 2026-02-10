import type { Timestamps } from "@/shared/model/types";

type UserRole = "EMPLOYEE" | "admin" | "OWNER" | "SUPER_ADMIN";
type UserStatus = "ACTIVE";

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
