"use client";

import { Calendar, Clock, FileText, TrendingUp } from "lucide-react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import { StatsCard } from "@/entities/stats";
import { useUserStore } from "@/entities/user";
import { formatDurationFull } from "@/shared/lib/utils";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const ProfileStats = () => {
  const { user } = useUserStore();
  const { data: totalStats, isPlaceholderData: isTotalStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId: user?.id,
    });
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

  if (!todayStats || !last7daysStats || !thisMonthStats || !totalStats) {
    return null;
  }

  const isPending =
    isTodayStatsPending ||
    isLast7daysPending ||
    isThisMonthPending ||
    isTotalStatsPending;

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
