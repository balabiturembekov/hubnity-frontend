import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { dashboardAnalyticsService } from "@/entities/dashboard-analytics/api/dashboard-analytics.service";
import type {
  DashboardAnalyticsResponse,
  GetDashboardAnalyticsParams,
} from "@/entities/dashboard-analytics/model/dashboard-analytics.types";

export const useGetDashboardAnalyticsQuery = (
  params?: GetDashboardAnalyticsParams,
  options?: Partial<UseQueryOptions<DashboardAnalyticsResponse, Error>>,
) =>
  useQuery<DashboardAnalyticsResponse, Error>({
    queryKey: ["dashboardAnalytics", params],
    queryFn: () => dashboardAnalyticsService.getDashboardAnalytics(params),
    ...options,
  });
