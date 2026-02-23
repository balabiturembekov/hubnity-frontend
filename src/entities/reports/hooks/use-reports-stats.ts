import {
  useAnalyticsStore,
  useGetAnalyticsHoursByProjectQuery,
  useGetAnalyticsProductivity,
  useGetDashboardAnalyticsQuery,
} from "@/entities/dashboard-analytics";

export const useReportsStats = () => {
  const { period } = useAnalyticsStore();

  const { data: dashboardAnalytics, isPending: isDashboardAnalyticsPending } =
    useGetDashboardAnalyticsQuery({
      period,
    });
  const { data: hoursByProject, isPending: isHoursByProjectPending } =
    useGetAnalyticsHoursByProjectQuery({
      period,
    });
  const { data: productivity, isPending: isProductivityPending } =
    useGetAnalyticsProductivity({
      period,
    });

  return {
    dashboardAnalytics,
    hoursByProject,
    productivity,
    isPending:
      isDashboardAnalyticsPending ||
      isHoursByProjectPending ||
      isProductivityPending,
  };
};
