import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";

export const useDashboardStats = () => {
  const { data: periodStats, isPending: isPeriodPending } =
    useGetDashboardAnalyticsQuery({ period: "30days" });
  const { data: todayStats, isPending: isTodayPending } =
    useGetDashboardAnalyticsQuery({ period: "today" });

  return {
    periodStats,
    todayStats,
    isPending: isPeriodPending || isTodayPending,
  };
};
