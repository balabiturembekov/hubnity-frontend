"use client";

import { Calendar, Clock, FileText, TrendingUp } from "lucide-react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import { StatsCard } from "@/entities/stats";
import { useCurrentUser } from "@/entities/user";
import { formatDurationFull } from "@/shared/lib/utils";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const ProfileStats = () => {
  const { data: user } = useCurrentUser();
  const { data: totalStats, isPlaceholderData: isTotalStatsPending } =
    useGetDashboardAnalyticsQuery(
      {
        userId: user?.id,
      },
      {
        enabled: !!user?.id,
      },
    );
  const { data: todayStats, isPending: isTodayStatsPending } =
    useGetDashboardAnalyticsQuery({
      period: "today",
    });
  const { data: last7daysStats, isPending: isLast7daysPending } =
    useGetDashboardAnalyticsQuery({
      period: "7days",
    });
  const { data: thisMonthStats, isPending: isThisMonthPending } =
    useGetDashboardAnalyticsQuery({
      period: "this_month",
    });

  const isPending =
    isTotalStatsPending ||
    !totalStats ||
    isTodayStatsPending ||
    !todayStats ||
    isLast7daysPending ||
    !last7daysStats ||
    isThisMonthPending ||
    !thisMonthStats;

  if (isPending) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Total Hours"
        icon={Clock}
        stat={formatDurationFull(totalStats.totalHours * 3600)}
        statsClassName="text-2xl"
        description={
          <p className="text-xs text-muted-foreground">
            {totalStats.entriesCount} entries tracked
          </p>
        }
        color="green"
      />
      <StatsCard
        title="Today"
        icon={Calendar}
        stat={formatDurationFull(todayStats.totalHours * 3600)}
        statsClassName="text-2xl"
        description={
          <p className="text-xs text-muted-foreground">Hours tracked today</p>
        }
        color="blue"
      />
      <StatsCard
        title="This Week"
        icon={TrendingUp}
        stat={formatDurationFull(last7daysStats.totalHours * 3600)}
        statsClassName="text-2xl"
        description={
          <p className="text-xs text-muted-foreground">Last 7 days</p>
        }
        color="red"
      />
      <StatsCard
        title="This Month"
        icon={FileText}
        stat={formatDurationFull(thisMonthStats.totalHours * 3600)}
        statsClassName="text-2xl"
        description={
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        }
        color="yellow"
      />
    </div>
  );
};
