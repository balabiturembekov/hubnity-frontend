"use client";

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
    !todayStats ||
    isLast7daysPending ||
    !last7daysStats ||
    isThisMonthPending ||
    !thisMonthStats ||
    isTotalStatsPending ||
    !totalStats;

  if (isPending) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Today"
        icon={Calendar}
        stat={formatDurationFull(todayStats.totalHours * 3600)} // TODO: Change to todayStats.totalSeconds after adding on backend
        description={`${todayStats.entriesCount} entries`}
        statsClassName="text-2xl"
        color="green"
      />

      <StatsCard
        title="This Week"
        icon={TrendingUp}
        stat={formatDurationFull(last7daysStats.totalHours * 3600)} // TODO: Change to last7daysStats.totalSeconds after adding on backend
        description="Last 7 days"
        statsClassName="text-2xl"
        color="blue"
      />

      <StatsCard
        title="This Month"
        icon={FileText}
        stat={formatDurationFull(thisMonthStats.totalHours * 3600)} // TODO: Change to thisMonthStats.totalSeconds after adding on backend
        description="Last 30 days"
        statsClassName="text-2xl"
        color="red"
      />

      <StatsCard
        title="Status"
        icon={Clock}
        stat={formatDurationFull(totalStats.totalHours * 3600)} // TODO: Change to totalStats.totalSeconds after adding on backend
        description="Hours tracked across all projects"
        statsClassName="text-2xl"
        color="yellow"
      />
    </div>
  );
};
