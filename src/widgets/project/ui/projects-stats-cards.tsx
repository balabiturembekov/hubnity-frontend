"use client";

import { CheckCircle2, DollarSign, Folder, TrendingUp } from "lucide-react";
import { useProjectsStats } from "@/entities/project";
import { StatsCard } from "@/entities/stats";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

// TODO: Refactor using new api endpoints
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
        stat={totalProjects ?? 0}
        description={
          <p className="text-xs text-muted-foreground">
            {totalActiveProjects ?? 0} active, {totalArchivedProjects ?? 0}{" "}
            archived
          </p>
        }
        color="green"
      />
      <StatsCard
        title="Total Budget"
        icon={DollarSign}
        stat={formattedTotalBudget ?? "$0"}
        description={
          <p className="text-xs text-muted-foreground">
            {totalProjectsWithBudget ?? 0} projects with budget
          </p>
        }
        color="red"
        statsClassName="text-xl"
      />
      <StatsCard
        title="Total Earned"
        icon={TrendingUp}
        stat={formattedTotalEarned ?? "$0"}
        statsClassName="text-xl"
        description={<p className="text-xs text-muted-foreground">All time</p>}
        color="blue"
      />
      <StatsCard
        title="Total Hours"
        icon={CheckCircle2}
        stat={`${(totalHours ?? 0).toFixed(2)}h`}
        description={
          <p className="text-xs text-muted-foreground">All projects</p>
        }
        color="yellow"
      />
    </div>
  );
};
