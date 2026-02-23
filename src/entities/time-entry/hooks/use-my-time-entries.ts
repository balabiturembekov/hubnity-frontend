import { useMemo } from "react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import { useCurrentUser } from "@/entities/user";
import { useGetMyTimeEntriesQuery } from "../model/query/use-get-my-time-entries.query";

export const useMyTimeEntries = () => {
  const { data: user } = useCurrentUser();

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
  const { data: myLast7daysStats, isPending: isMyLast7daysStatsPending } =
    useGetDashboardAnalyticsQuery(
      {
        userId: user?.id,
        period: "7days",
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
    myLast7daysStats,
    myThisMonthStats,
    isMyStatsPending:
      isMyTotalStatsPending ||
      isMyTodayStatsPending ||
      isMyLast7daysStatsPending ||
      isMyThisMonthStatsPending,
    isMyRecentTimeEntriesPending: isMyTimeEntriesPending,
  };
};
