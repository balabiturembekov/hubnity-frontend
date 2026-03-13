import type { FirstUsersRoles } from "@/entities/invitation";
import type { Timestamps } from "@/shared/model/types";

export interface InviteLinkEntity extends Timestamps {
  id: string;
  token: string;
  role: FirstUsersRoles;
  organizationId: string;
  expiresAt: string;
  maxUses: number;
  useCount: number;
  isActive: boolean;
}

export interface CreateInviteLinkReq {
  organizationId: string;
  role: FirstUsersRoles;
  expiresInDays: number;
  maxUses: number;
}

export interface OrganizationByTokenEntity {
  id: string;
  name: string;
}
