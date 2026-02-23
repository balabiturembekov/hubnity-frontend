"use client";

import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Calendar, Clock, FileText, TrendingUp } from "lucide-react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import { StatsCard } from "@/entities/stats";
import { formatDurationFull } from "@/shared/lib/utils";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const TimeEntryStatsCards = () => {
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
  const { data: totalStats, isPending: isTotalStatsPending } =
    useGetDashboardAnalyticsQuery();

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
        title="Today"
        icon={Calendar}
        stat={formatDurationFull((todayStats?.totalHours ?? 0) * 3600)}
        description={`${todayStats?.entriesCount ?? 0} entries`}
        statsClassName="text-2xl"
        color="green"
      />

      <StatsCard
        title="This Week"
        icon={TrendingUp}
        stat={`${last7daysStats?.totalHours ?? 0}h`}
        description={
          <p className="text-xs text-muted-foreground">
            {format(startOfWeek(new Date(), { weekStartsOn: 1 }), "MMM d")} -{" "}
            {format(endOfWeek(new Date(), { weekStartsOn: 1 }), "MMM d")}
          </p>
        }
        statsClassName="text-2xl"
        color="blue"
      />

      <StatsCard
        title="This Month"
        icon={FileText}
        stat={`${thisMonthStats?.totalHours ?? 0}h`}
        description={
          <p className="text-xs text-muted-foreground">
            {format(startOfMonth(new Date()), "MMM d")} -{" "}
            {format(endOfMonth(new Date()), "MMM d")}
          </p>
        }
        statsClassName="text-2xl"
        color="red"
      />

      <StatsCard
        title="Total Hours"
        icon={Clock}
        stat={`${totalStats?.totalHours ?? 0}h`}
        description="All time"
        statsClassName="text-2xl"
        color="yellow"
      />
    </div>
  );
};
