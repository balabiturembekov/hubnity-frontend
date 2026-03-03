import { useMemo } from "react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import { useCurrentUser } from "@/entities/user";
import { getPeriods } from "@/shared/lib/date/date-periods";
import {
  DEFAULT_MY_TIME_ENTRIES_STATE,
  mapMyTimeEntriesData,
} from "../lib/my-time-entries-stats.utils";
import { useGetMyTimeEntriesQuery } from "../model/query/use-get-my-time-entries.query";

export const useMyTimeEntries = () => {
  const { data: user } = useCurrentUser();
  const periods = useMemo(() => getPeriods(), []);

  const { data: myTimeEntries, isPending: isMyTimeEntriesPending } =
    useGetMyTimeEntriesQuery();

  const { data: myTotalStats, isPending: isMyTotalStatsPending } =
    useGetDashboardAnalyticsQuery(
      {
        userId: user?.id,
      },
      {
        enabled: !!user?.id,
      },
    );

  const { data: myTodayStats, isPending: isMyTodayStatsPending } =
    useGetDashboardAnalyticsQuery(
      {
        userId: user?.id,
        period: "today",
      },
      {
        enabled: !!user?.id,
      },
    );

  const { data: myThisWeekStats, isPending: isMyThisWeekStatsPending } =
    useGetDashboardAnalyticsQuery(
      {
        userId: user?.id,
        period: "custom",
        startDate: periods.thisWeek.start,
        endDate: periods.thisWeek.end,
      },
      {
        enabled: !!user?.id,
      },
    );

  const { data: myThisMonthStats, isPending: isMyThisMonthStatsPending } =
    useGetDashboardAnalyticsQuery(
      {
        userId: user?.id,
        period: "this_month",
      },
      {
        enabled: !!user?.id,
      },
    );

  const { data: myLastMonthStats, isPending: isMyLastMonthStatsPending } =
    useGetDashboardAnalyticsQuery(
      {
        userId: user?.id,
        period: "last_month",
      },
      {
        enabled: !!user?.id,
      },
    );

  const { data: prev1WeekStats, isPending: isPrev1WeekStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId: user?.id,
      period: "custom",
      startDate: periods.prev1Week.start,
      endDate: periods.prev1Week.end,
    });

  const { data: prev2WeekStats, isPending: isPrev2WeekStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId: user?.id,
      period: "custom",
      startDate: periods.prev2Week.start,
      endDate: periods.prev2Week.end,
    });

  const { data: prev3WeekStats, isPending: isPrev3WeekStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId: user?.id,
      period: "custom",
      startDate: periods.prev3Week.start,
      endDate: periods.prev3Week.end,
    });

  const myStats = useMemo(() => {
    if (
      !myTimeEntries ||
      !myTotalStats ||
      !myTodayStats ||
      !myThisWeekStats ||
      !myThisMonthStats ||
      !myLastMonthStats ||
      !prev1WeekStats ||
      !prev2WeekStats ||
      !prev3WeekStats
    ) {
      return DEFAULT_MY_TIME_ENTRIES_STATE;
    }

    return mapMyTimeEntriesData({
      timeEntries: myTimeEntries,
      stats: {
        total: myTotalStats,
        today: myTodayStats,
        thisWeek: myThisWeekStats,
        thisMonth: myThisMonthStats,
        lastMonth: myLastMonthStats,
        prev1: prev1WeekStats,
        prev2: prev2WeekStats,
        prev3: prev3WeekStats,
      },
    });
  }, [
    myTimeEntries,
    myTotalStats,
    myTodayStats,
    myThisWeekStats,
    myThisMonthStats,
    myLastMonthStats,
    prev1WeekStats,
    prev2WeekStats,
    prev3WeekStats,
  ]);

  return {
    ...myStats,
    isMyStatsPending:
      isMyTotalStatsPending ||
      isMyTodayStatsPending ||
      isMyThisWeekStatsPending ||
      isMyThisMonthStatsPending ||
      isMyLastMonthStatsPending,
    isMyPrevWeeksPending:
      isPrev1WeekStatsPending ||
      isPrev2WeekStatsPending ||
      isPrev3WeekStatsPending,
    isMyRecentTimeEntriesPending: isMyTimeEntriesPending,
  };
};
