import { useMemo } from "react";
import { useGetAnalyticsHoursByProjectQuery } from "@/entities/dashboard-analytics";
import { useGetActiveProjectsQuery } from "../model/queries/use-get-active-projects.query";
import { useGetProjectsQuery } from "../model/queries/use-get-projects.query";

export const useProjectsStats = () => {
  const { data: hoursByProject, isPending: isHoursByProjectPending } =
    useGetAnalyticsHoursByProjectQuery();
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
    const totalEarned =
      hoursByProject?.data.reduce((sum, project) => sum + project.earned, 0) ??
      0;

    const totalHours = hoursByProject?.data.reduce(
      (sum, project) => sum + project.hours,
      0,
    );

    const totalProjectsWithBudget = projects.filter(
      (project) => project.budget > 0,
    ).length;

    const activeProjectsPercent =
      totalProjects > 0
        ? Math.round((totalActiveProjects / totalProjects) * 100)
        : 0;

    const totalBudget = projects.reduce(
      (sum, project) => sum + project.budget,
      0,
    );

    const formattedTotalBudget = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalBudget);

    const formattedTotalEarned = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalEarned);

    return {
      totalProjects,
      totalActiveProjects,
      totalArchivedProjects,
      totalProjectsWithBudget,
      activeProjectsPercent,
      formattedTotalBudget,
      formattedTotalEarned,
      totalHours,
    };
  }, [projects, activeProjects, hoursByProject]);

  return {
    ...stats,
    hoursByProject,
    isPending:
      isProjectsPending || isActiveProjectsPending || isHoursByProjectPending,
  };
};
