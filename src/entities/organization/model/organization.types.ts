import type { UserEntity } from "@/entities/user";
import type { Timestamps } from "@/shared/model/types";

export const memberRoles = ["OWNER", "ADMIN", "MANAGER", "USER"] as const;
export type MemberRole = (typeof memberRoles)[number];

export const newMemberRoles = ["ADMIN", "MANAGER", "USER"] as const;
export type NewMemberRole = (typeof newMemberRoles)[number];

export const memberStatuses = [
  "PENDING",
  "ACTIVE",
  "SUSPENDED",
  "INACTIVE",
] as const;
export type MemberStatus = (typeof memberStatuses)[number];

export interface OrganizationEntity extends Timestamps {
  id: string;
  name: string;
  ownerId: string;
  settings: {
    theme: string;
  };
  timezone: string;
  currency: string;
  membersCount: number;
  projectsCount: number;
  clientsCount: number;
  teamSize: TeamSize;
}

export interface MemberEntity extends Timestamps {
  id: string;
  role: MemberRole;
  status: MemberStatus;
  hourlyRate: number;
  weeklyLimit: number;
  joinedAt: string;
  invitedAt: string;
  settings: Settings;
  organizationId: string;
  userId: string;
  invitedById: string;
  user: UserEntity;
  invitedBy: InvitedBy;
}

export interface Settings {
  notifications: boolean;
}

export interface InvitedBy {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type TeamSize =
  | "SIZE_1_2"
  | "SIZE_3_6"
  | "SIZE_7_10"
  | "SIZE_11_50"
  | "SIZE_51_250"
  | "SIZE_251_500"
  | "SIZE_500_PLUS";
