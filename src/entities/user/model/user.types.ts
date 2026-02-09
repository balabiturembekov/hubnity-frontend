import type { Timestamps } from "@/shared/model/types";

type UserRole = "EMPLOYEE";
type UserStatus = "ACTIVE";

export interface UserEntity extends Timestamps {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  avatar: string;
  hourlyRate: number;
  companyId: string;
}
