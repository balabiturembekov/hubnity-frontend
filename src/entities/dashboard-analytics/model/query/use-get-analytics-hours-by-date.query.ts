import { useQuery } from "@tanstack/react-query";
import {
  dashboardAnalyticsService,
  type GetDashboardAnalyticsParams,
} from "@/entities/dashboard-analytics";

export const useGetAnalyticsHoursByDayRes = (
  params?: GetDashboardAnalyticsParams,
) =>
  useQuery({
    queryKey: ["analyticsHoursByDate", params],
    queryFn: () => dashboardAnalyticsService.getHoursByDay(params),
  });
