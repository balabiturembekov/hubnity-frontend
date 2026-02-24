import { endOfWeek, format, startOfWeek, subWeeks } from "date-fns";
import { useMemo } from "react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import { useCurrentUser } from "@/entities/user";
import { useGetMyTimeEntriesQuery } from "../model/query/use-get-my-time-entries.query";

export const useMyTimeEntries = () => {
  const { data: user } = useCurrentUser();
  const now = new Date();
  const startDate = format(startOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd");
  const endDate = format(endOfWeek(now, { weekStartsOn: 1 }), "yyyy-MM-dd");

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
        startDate,
        endDate,
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

  const prev1WeekStart = format(
    startOfWeek(subWeeks(now, 1), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );
  const prev1WeekEnd = format(
    endOfWeek(subWeeks(now, 1), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );

  const { data: prev1WeekStats, isPending: isPrev1WeekStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId: user?.id,
      period: "custom",
      startDate: prev1WeekStart,
      endDate: prev1WeekEnd,
    });

  const prev2WeekStart = format(
    startOfWeek(subWeeks(now, 2), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );
  const prev2WeekEnd = format(
    endOfWeek(subWeeks(now, 2), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );
  const { data: prev2WeekStats, isPending: isPrev2WeekStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId: user?.id,
      period: "custom",
      startDate: prev2WeekStart,
      endDate: prev2WeekEnd,
    });

  const prev3WeekStart = format(
    startOfWeek(subWeeks(now, 3), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );
  const prev3WeekEnd = format(
    endOfWeek(subWeeks(now, 3), { weekStartsOn: 1 }),
    "yyyy-MM-dd",
  );
  const { data: prev3WeekStats, isPending: isPrev3WeekStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId: user?.id,
      period: "custom",
      startDate: prev3WeekStart,
      endDate: prev3WeekEnd,
    });

  const myStats = useMemo(() => {
    const myEntries =
      myTimeEntries?.filter((entry) => entry.status === "STOPPED") ?? [];
    const myActiveEntries =
      myTimeEntries?.filter((entry) => entry.status === "RUNNING") ?? [];

    return {
      myEntries,
      myActiveEntries,
    };
  }, [myTimeEntries]);

  return {
    ...myStats,
    myTotalStats,
    myTodayStats,
    myThisWeekStats,
    myThisMonthStats,
    isMyStatsPending:
      isMyTotalStatsPending ||
      isMyTodayStatsPending ||
      isMyThisWeekStatsPending ||
      isMyThisMonthStatsPending,
    isMyPrevWeeksPending:
      isPrev1WeekStatsPending ||
      isPrev2WeekStatsPending ||
      isPrev3WeekStatsPending,
    isMyRecentTimeEntriesPending: isMyTimeEntriesPending,
    prev1WeekStats,
    prev2WeekStats,
    prev3WeekStats,
  };
};
