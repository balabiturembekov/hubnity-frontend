export type DashboardAnalyticsPeriod =
  | "today"
  | "yesterday"
  | "7days"
  | "30days"
  | "90days"
  | "this_month"
  | "last_month"
  | "this_year"
  | "custom";

export interface GetDashboardAnalyticsParams {
  period: DashboardAnalyticsPeriod;
  startDate?: string; // YYYY-MM-DD, used with period = "custom"
  endDate?: string; // YYYY-MM-DD, used with period = "custom"
  userId?: string;
  projectId?: string;
  limit?: number;
}

export interface DashboardAnalyticsPeriodRange {
  startDate: string;
  endDate: string;
}

export interface DashboardAnalyticsResponse {
  period: DashboardAnalyticsPeriodRange;
  totalHours: number;
  totalEarned: number;
  entriesCount: number;
  activeUsersCount: number;
  activeProjectsCount: number;
}

interface ProjectType {
  projectId: string;
  projectName: string;
  projectColor: string;
  hours: number;
  earned: number;
}

export interface GetHoursByProjectRes {
  period: DashboardAnalyticsPeriodRange;
  data: ProjectType[];
}

type HoursByDateType = {
  date: string;
  hours: number;
};

export type GetAnalyticsHoursByDayRes = {
  period: DashboardAnalyticsPeriod;
  data: HoursByDateType[];
};

export interface GetAnalyticsProductivityRes {
  period: DashboardAnalyticsPeriodRange;
  totalHours: number;
  avgHoursPerDay: number;
  byUser: ByUser[];
}

export interface ByUser {
  userName: string;
  hours: number;
  earned: number;
  entriesCount: number;
  avgEntryHours: number;
}
