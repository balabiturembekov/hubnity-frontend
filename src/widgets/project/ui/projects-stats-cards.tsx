"use client";

import { CheckCircle2, DollarSign, Folder, FolderOpen } from "lucide-react";
import { useMemo } from "react";
import { useGetActiveProjectsQuery } from "@/entities/project/model/mutations/use-get-active-projects.query";
import { useGetProjectsQuery } from "@/entities/project/model/queries/use-get-projects.query";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export const ProjectsStatsCards = () => {
  const { data: projects } = useGetProjectsQuery();
  const { data: activeProjects } = useGetActiveProjectsQuery();

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

  if (!stats) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="w-full h-38">
            <CardContent className="flex flex-col justify-between h-full">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-5 w-5" />
              </div>

              <div className="space-y-2.5">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-64" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
          <Folder className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalProjects}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalActiveProjects} active, {stats.totalArchivedProjects}{" "}
            archived
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
            {stats.totalActiveProjects}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.activeProjectsPercent}% of total
          </p>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.formattedTotalBudget}</div>
          <p className="text-xs text-muted-foreground">
            {stats.totalProjectsWithBudget} projects with budget
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
