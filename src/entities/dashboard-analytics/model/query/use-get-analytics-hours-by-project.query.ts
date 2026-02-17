import { useQuery } from "@tanstack/react-query";
import {
  dashboardAnalyticsService,
  type GetDashboardAnalyticsParams,
} from "@/entities/dashboard-analytics";

export const useGetAnalyticsHoursByProjectQuery = (
  params?: GetDashboardAnalyticsParams,
) =>
  useQuery({
    queryKey: ["analyticsHoursByProject", params],
    queryFn: () => dashboardAnalyticsService.getHoursByProject(params),
  });
