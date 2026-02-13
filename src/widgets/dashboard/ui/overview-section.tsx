"use client";

import { Activity, Clock, Folder, TrendingUp, Users } from "lucide-react";
import { useGetProjectsQuery } from "@/entities/project";
import { StatsCard } from "@/entities/stats";
import { useTimeEntry } from "@/features/time-entry";
import { DashboardSectionHeader } from "@/widgets/header";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const OverviewSection = () => {
  const { data: projects } = useGetProjectsQuery();
  const { todayTime, totalTime, activeTimeEntries, isPending } = useTimeEntry();

  return (
    <section className="space-y-4">
      <DashboardSectionHeader title="Overview" icon={Activity} />

      {!projects || !activeTimeEntries || isPending ? (
        <StatsCardsSkeleton />
      ) : (
        <div className="flex items-center gap-4 w-full">
          <StatsCard
            title="Total Hours"
            icon={Clock}
            stat={totalTime}
            description="All time tracked"
          />
          <StatsCard
            title="Active Users"
            icon={Users}
            stat={activeTimeEntries.length}
            description="Currently tracking"
          />
          <StatsCard
            title="Projects"
            icon={Folder}
            stat={projects.length}
            description="Active projects"
          />
          <StatsCard
            title="Today"
            icon={TrendingUp}
            stat={todayTime}
            description="Hours today"
          />
        </div>
      )}
    </section>
  );
};
