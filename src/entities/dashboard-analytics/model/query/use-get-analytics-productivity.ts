import { useQuery } from "@tanstack/react-query";
import {
  dashboardAnalyticsService,
  type GetDashboardAnalyticsParams,
} from "@/entities/dashboard-analytics";

export const useGetAnalyticsProductivity = (
  params?: GetDashboardAnalyticsParams,
) =>
  useQuery({
    queryKey: ["analyticsProductivity", params],
    queryFn: () => dashboardAnalyticsService.getProductivity(params),
  });
