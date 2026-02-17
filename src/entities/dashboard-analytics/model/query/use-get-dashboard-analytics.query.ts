import { useQuery } from "@tanstack/react-query";
import { dashboardAnalyticsService } from "@/entities/dashboard-analytics/api/dashboard-analytics.service";
import type {
  DashboardAnalyticsResponse,
  GetDashboardAnalyticsParams,
} from "@/entities/dashboard-analytics/model/dashboard-analytics.types";

export const useGetDashboardAnalyticsQuery = (
  params?: GetDashboardAnalyticsParams,
) =>
  useQuery<DashboardAnalyticsResponse, Error>({
    queryKey: ["dashboardAnalytics", params],
    queryFn: () => dashboardAnalyticsService.getDashboardAnalytics(params),
  });
