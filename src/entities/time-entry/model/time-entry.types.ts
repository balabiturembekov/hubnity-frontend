import type { Timestamps } from "@/shared/model/types";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface Project {
  id: string;
  name: string;
  color: string;
}

export type TimeEntryStatusType = "STOPPED" | "RUNNING" | "PAUSED";

export interface TimeEntryEntity extends Timestamps {
  id: string;
  userId: string;
  projectId: string | null;
  startTime: string;
  endTime: string | null;
  duration: number;
  description: string | null;
  status: TimeEntryStatusType;
  user: User;
  project: Project | null;
}

export interface getTimeEntriesParams {
  limit?: number;
  userId?: string;
  projectId?: string;
}

export interface CreateTimeEntryReq {
  userId: string;
  projectId?: string | null;
  startTime: string;
  description?: string;
  status: TimeEntryStatusType;
}

export interface UpdateTimeEntryReq {
  projectId?: string | null;
  duration?: number;
  description?: string;
  endTime?: string;
  status?: TimeEntryStatusType;
}
