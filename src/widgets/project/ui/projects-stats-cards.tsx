"use client";

import { CheckCircle2, DollarSign, Folder, FolderOpen } from "lucide-react";
import { useMemo } from "react";
import {
  useGetActiveProjectsQuery,
  useGetProjectsQuery,
} from "@/entities/project";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const ProjectsStatsCards = () => {
  const { data: projects, isPending: isProjectsPending } =
    useGetProjectsQuery();
  const { data: activeProjects, isPending: isActiveProjectsPending } =
    useGetActiveProjectsQuery();

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

  const isPending = isProjectsPending || isActiveProjectsPending;

  if (isPending) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <Folder className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats ? stats.totalProjects : 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats ? stats.totalActiveProjects : 0} active,{" "}
            {stats ? stats.totalArchivedProjects : 0} archived
          </p>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active</CardTitle>
          <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats ? stats.totalActiveProjects : 0}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats ? stats.activeProjectsPercent : 0}% of total
          </p>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {stats ? stats.formattedTotalBudget : "$0"}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats ? stats.totalProjectsWithBudget : 0} projects with budget
          </p>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {/*{stats.totalHours > 0 ? stats.totalHours.toFixed(1) : "0"}*/}0
          </div>
          <p className="text-xs text-muted-foreground">
            Hours tracked across all projects
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
