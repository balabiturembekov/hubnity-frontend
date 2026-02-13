"use client";

import { Calendar, Clock, FileText, TrendingUp } from "lucide-react";
import { StatsCard } from "@/entities/stats";
import { useTimeEntry } from "@/features/time-entry";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const TimeEntryStatsCards = () => {
  const stats = useTimeEntry();

  if (stats.isPending) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Today"
        icon={Calendar}
        stat={stats.todayTime}
        description={`${stats.entriesCount} entries`}
      />

      <StatsCard
        title="This Week"
        icon={TrendingUp}
        stat={stats.weekTime}
        description="Last 7 days"
      />

      <StatsCard
        title="This Month"
        icon={FileText}
        stat={stats.monthTime}
        description="Last 30 days"
      />

      <StatsCard
        title="Status"
        icon={Clock}
        stat={stats.totalHours}
        description="Hours tracked across all projects"
      />
    </div>
  );
};
