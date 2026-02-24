"use client";

import { CheckCircle2, DollarSign, Folder, TrendingUp } from "lucide-react";
import { useProjectsStats } from "@/entities/project";
import { StatsCard } from "@/entities/stats";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const ProjectsStatsCards = () => {
  const {
    totalProjects,
    totalActiveProjects,
    totalArchivedProjects,
    totalProjectsWithBudget,
    formattedTotalBudget,
    formattedTotalEarned,
    totalHours,
    isPending,
  } = useProjectsStats();

  if (isPending) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Projects"
        icon={Folder}
        stat={totalProjects}
        description={
          <p className="text-xs text-muted-foreground">
            {totalActiveProjects} active, {totalArchivedProjects} archived
          </p>
        }
        color="green"
      />
      <StatsCard
        title="Total Budget"
        icon={DollarSign}
        stat={formattedTotalBudget}
        description={
          <p className="text-xs text-muted-foreground">
            {totalProjectsWithBudget} projects with budget
          </p>
        }
        color="red"
        statsClassName="text-xl"
      />
      <StatsCard
        title="Total Earned"
        icon={TrendingUp}
        stat={formattedTotalEarned}
        statsClassName="text-xl"
        description={<p className="text-xs text-muted-foreground">All time</p>}
        color="blue"
      />
      <StatsCard
        title="Total Hours"
        icon={CheckCircle2}
        stat={`${totalHours.toFixed(2)}h`}
        description={
          <p className="text-xs text-muted-foreground">All projects</p>
        }
        color="yellow"
      />
    </div>
  );
};
