import type {
  DashboardAnalyticsResponse,
  GetAnalyticsHoursByDayRes,
  GetAnalyticsProductivityRes,
  GetDashboardAnalyticsParams,
  GetHoursByProjectRes,
} from "@/entities/dashboard-analytics/model/dashboard-analytics.types";
import { api } from "@/shared/config/api";

class DashboardAnalyticsService {
  async getDashboardAnalytics(params?: GetDashboardAnalyticsParams) {
    const res = await api.get<DashboardAnalyticsResponse>(
      "/analytics/dashboard",
      { params },
    );
    return res.data;
  }

  async getHoursByProject(params?: GetDashboardAnalyticsParams) {
    const res = await api<GetHoursByProjectRes>("/analytics/hours-by-project", {
      params,
    });
    return res.data;
  }

  async getHoursByDay(params?: GetDashboardAnalyticsParams) {
    const res = await api.get<GetAnalyticsHoursByDayRes>(
      "/analytics/hours-by-day",
      { params },
    );
    return res.data;
  }

  async getProductivity(params?: GetDashboardAnalyticsParams) {
    const res = await api.get<GetAnalyticsProductivityRes>(
      "/analytics/productivity",
      { params },
    );
    return res.data;
  }
}

export const dashboardAnalyticsService = new DashboardAnalyticsService();
