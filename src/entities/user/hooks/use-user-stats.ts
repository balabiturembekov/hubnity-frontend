import { endOfWeek, format, startOfWeek } from "date-fns";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";

export const useUserStats = (userId: string) => {
  const now = new Date();
  const startDate = format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd");
  const endDate = format(endOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd");

  const { data: todayStats, isPending: isTodayStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId,
      period: "today",
    });
  const { data: thisWeekStats, isPending: isThisWeekStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId,
      period: "custom",
      startDate,
      endDate,
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
