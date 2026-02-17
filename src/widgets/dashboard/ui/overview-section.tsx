"use client";

import { Activity, Clock, Folder, TrendingUp, Users } from "lucide-react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import { StatsCard } from "@/entities/stats";
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
            stat={periodStats.totalHours.toFixed(2)}
            description="Last 30 days"
          />
          <StatsCard
            title="Active Users"
            icon={Users}
            stat={periodStats.activeUsersCount}
            description="In the period"
          />
          <StatsCard
            title="Projects"
            icon={Folder}
            stat={periodStats.activeProjectsCount}
            description="Active projects"
          />
          <StatsCard
            title="Today"
            icon={TrendingUp}
            stat={todayStats.totalHours.toFixed(2)}
            description="Hours today"
          />
        </div>
      )}
    </section>
  );
};
