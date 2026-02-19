"use client";

import { Activity, Clock, Folder, TrendingUp, Users } from "lucide-react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import { StatsCard } from "@/entities/stats";
import { formatDurationFull } from "@/shared/lib/utils";
import { DashboardSectionHeader } from "@/widgets/header";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const OverviewSection = () => {
  const { data: periodStats, isPending: isPeriodPending } =
    useGetDashboardAnalyticsQuery({ period: "30days" });
  const { data: todayStats, isPending: isTodayPending } =
    useGetDashboardAnalyticsQuery({ period: "today" });

  const isPending = isPeriodPending || isTodayPending;

  return (
    <section className="space-y-4">
      <DashboardSectionHeader title="Overview" icon={Activity} />

      {!periodStats || !todayStats || isPending ? (
        <StatsCardsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
          <StatsCard
            title="Total Hours"
            icon={Clock}
            stat={formatDurationFull(periodStats.totalHours * 3600)}
            statsClassName="text-2xl"
            description="Last 30 days"
            color="green"
          />
          <StatsCard
            title="Active Users"
            icon={Users}
            stat={periodStats.activeUsersCount}
            description="In the period"
            color="blue"
          />
          <StatsCard
            title="Projects"
            icon={Folder}
            stat={periodStats.activeProjectsCount}
            description="Active projects"
            color="red"
          />
          <StatsCard
            title="Today"
            icon={TrendingUp}
            stat={formatDurationFull(todayStats.totalHours * 3600)}
            statsClassName="text-2xl"
            description="Hours today"
            color="yellow"
          />
        </div>
      )}
    </section>
  );
};
