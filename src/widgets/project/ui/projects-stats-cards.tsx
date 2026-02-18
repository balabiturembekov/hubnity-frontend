"use client";

import { CheckCircle2, DollarSign, Folder, FolderOpen } from "lucide-react";
import { useMemo } from "react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import {
  useGetActiveProjectsQuery,
  useGetProjectsQuery,
} from "@/entities/project";
import { StatsCard } from "@/entities/stats";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

// TODO: Refactor using new api endpoints
export const ProjectsStatsCards = () => {
  const { data: projects, isPending: isProjectsPending } =
    useGetProjectsQuery();
  const { data: activeProjects, isPending: isActiveProjectsPending } =
    useGetActiveProjectsQuery();
  const { data: projectsStats, isPending: isProjectsStatsPending } =
    useGetDashboardAnalyticsQuery();

  const stats = useMemo(() => {
    if (!projects || !activeProjects) {
      return null;
    }

    const totalProjects = projects.length;
    const totalActiveProjects = activeProjects.length;
    const totalArchivedProjects = totalProjects - totalActiveProjects;

    const totalBudget = projects.reduce(
      (sum, project) => sum + project.budget,
      0,
    );

    const totalProjectsWithBudget = projects.filter(
      (project) => project.budget > 0,
    ).length;

    const activeProjectsPercent =
      totalProjects > 0
        ? Math.round((totalActiveProjects / totalProjects) * 100)
        : 0;

    const formattedTotalBudget = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalBudget);

    return {
      totalProjects,
      totalActiveProjects,
      totalArchivedProjects,
      totalBudget,
      totalProjectsWithBudget,
      activeProjectsPercent,
      formattedTotalBudget,
    };
  }, [projects, activeProjects]);

  const isPending =
    isProjectsPending || isActiveProjectsPending || isProjectsStatsPending;

  if (!projectsStats || isPending) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Projects"
        icon={Folder}
        stat={stats ? stats.totalProjects : 0}
        description={
          <p className="text-xs text-muted-foreground">
            {stats ? stats.totalActiveProjects : 0} active,{" "}
            {stats ? stats.totalArchivedProjects : 0} archived
          </p>
        }
        color="green"
      />
      <StatsCard
        title="Active"
        icon={CheckCircle2}
        stat={stats ? stats.totalProjects : 0}
        description={
          <p className="text-xs text-muted-foreground">
            {stats ? stats.totalActiveProjects : 0} active,{" "}
            {stats ? stats.totalArchivedProjects : 0} archived
          </p>
        }
        color="blue"
      />
      <StatsCard
        title="Total Budget"
        icon={DollarSign}
        stat={stats ? stats.formattedTotalBudget : "$0"}
        description={
          <p className="text-xs text-muted-foreground">
            {stats ? stats.totalProjectsWithBudget : 0} projects with budget
          </p>
        }
        color="red"
      />
      <StatsCard
        title="Total Hours"
        icon={FolderOpen}
        // stat={stats.totalHours > 0 ? stats.totalHours.toFixed(1) : "0"}
        stat="0"
        description={
          <p className="text-xs text-muted-foreground">
            Hours tracked across all projects
          </p>
        }
        color="yellow"
      />
    </div>
  );
};
