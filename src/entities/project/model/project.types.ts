import type { Timestamps } from "@/shared/model/types";

export const projectStatuses = ["ACTIVE", "ARCHIVED"] as const;
export type ProjectStatusType = (typeof projectStatuses)[number];

export interface ProjectEntity extends Timestamps {
  id: string;
  name: string;
  description: string;
  color: string;
  clientName: string;
  budget: number;
  status: ProjectStatusType;
  companyId: string;
}

export interface CreateProjectReq {
  name: string;
  description: string;
  color: string;
  clientName: string;
  budget: number;
  status: ProjectStatusType;
}

export interface UpdateProjectReq {
  name?: string;
  description?: string;
  color?: string;
  clientName?: string;
  budget?: number;
  status?: ProjectStatusType;
}
