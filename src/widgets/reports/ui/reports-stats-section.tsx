"use client";

import { Award, Clock, TrendingUp, Users } from "lucide-react";
import { useReportsStats } from "@/entities/reports";
import { StatsCard } from "@/entities/stats";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const ReportsStatsSection = () => {
  const { dashboardAnalytics, hoursByProject, productivity, isPending } =
    useReportsStats();

  return (
    <section>
      {!dashboardAnalytics || !productivity || !hoursByProject || isPending ? (
        <StatsCardsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
          <StatsCard
            title="Active Users"
            icon={Users}
            stat={dashboardAnalytics.activeUsersCount}
            description="Users with tracked time"
            color="red"
          />
          <StatsCard
            title="Avg. Hours/Day"
            icon={TrendingUp}
            stat={`${productivity.avgHoursPerDay}h`}
            description="Average per day"
            color="blue"
          />
          <StatsCard
            title="Top Project"
            icon={Award}
            stat={`${hoursByProject.data[0].hours}h`}
            description={hoursByProject.data[0].projectName}
            color="yellow"
          />
          <StatsCard
            title="Total Hours"
            icon={Clock}
            stat={`${dashboardAnalytics.totalHours}h`}
            description={`${dashboardAnalytics.entriesCount} entries tracked`}
            color="green"
          />
        </div>
      )}
    </section>
  );
};
