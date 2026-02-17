import { useQuery } from "@tanstack/react-query";
import {
  dashboardAnalyticsService,
  type GetDashboardAnalyticsParams,
} from "@/entities/dashboard-analytics";

export const useGetAnalyticsWorkSessionQuery = (
  params?: GetDashboardAnalyticsParams,
) =>
  useQuery({
    queryKey: ["analyticsWorkSession", params],
    queryFn: () => dashboardAnalyticsService.getWorkSessions(params),
  });
