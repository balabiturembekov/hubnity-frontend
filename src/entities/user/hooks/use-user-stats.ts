import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";

export const useUserStats = (userId: string) => {
  const { data: todayStats, isPending: isTodayStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId,
      period: "today",
    });
  const { data: thisWeekStats, isPending: isThisWeekStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId,
      period: "7days",
    });
  const { data: thisMonthStats, isPending: isThisMonthStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId,
      period: "this_month",
    });

  return {
    isPending:
      isThisWeekStatsPending || isThisMonthStatsPending || isTodayStatsPending,
    todayStats,
    thisWeekStats,
    thisMonthStats,
  };
};
