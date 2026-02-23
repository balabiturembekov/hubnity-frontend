"use client";

import { format } from "date-fns";
import { Activity, Clock, Folder, TrendingUp, Users } from "lucide-react";
import { useDashboardStats } from "@/entities/dashboard";
import { StatsCard } from "@/entities/stats";
import { formatDurationFull } from "@/shared/lib/utils";
import { DashboardSectionHeader } from "@/widgets/header";
import {
  DashboardSectionHeaderSkeleton,
  StatsCardsSkeleton,
} from "@/widgets/skeleton";

export const OverviewSection = () => {
  const { periodStats, todayStats, isPending } = useDashboardStats();

  if (isPending) {
    return (
      <section className="space-y-4">
        <DashboardSectionHeaderSkeleton />
        <StatsCardsSkeleton />
      </section>
    );
  }

  return (
    <section className="space-y-4">
      <DashboardSectionHeader title="Overview" icon={Activity} />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
        <StatsCard
          title="Today"
          icon={TrendingUp}
          stat={formatDurationFull(Number(todayStats?.totalHours ?? 0) * 3600)}
          statsClassName="text-2xl"
          description={
            <p className="text-xs text-muted-foreground">
              {format(new Date(), "MMM d")}
            </p>
          }
          color="yellow"
        />
        <StatsCard
          title="Active Users"
          icon={Users}
          stat={periodStats?.activeUsersCount ?? 0}
          description="In the period"
          color="blue"
        />
        <StatsCard
          title="Projects"
          icon={Folder}
          stat={periodStats?.activeProjectsCount ?? 0}
          description="Active projects"
          color="red"
        />
        <StatsCard
          title="Total Hours"
          icon={Clock}
          stat={`${periodStats?.totalHours ?? 0}h`}
          statsClassName="text-2xl"
          description="Last 30 days"
          color="green"
        />
      </div>
    </section>
  );
};
