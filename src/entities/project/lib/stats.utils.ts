import type { GetHoursByProjectRes } from "@/entities/dashboard-analytics";
import { formatCurrency } from "@/shared/lib/formatters/currency";
import type { ProjectEntity } from "../model/project.types";

interface MapProjectsToStatsParams {
  projects: ProjectEntity[];
  activeProjects: ProjectEntity[];
  hoursByProject?: GetHoursByProjectRes;
}

export const mapProjectsToStats = ({
  projects,
  activeProjects,
  hoursByProject,
}: MapProjectsToStatsParams) => {
  const totalProjects = projects.length;
  const totalActiveProjects = activeProjects.length;

  const totalArchivedProjects = totalProjects - totalActiveProjects;
  const activeProjectsPercent =
    totalProjects > 0
      ? Math.round((totalActiveProjects / totalProjects) * 100)
      : 0;
  const totalProjectsWithBudget = projects.filter((p) => p.budget > 0).length;

  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalEarned =
    hoursByProject?.data.reduce((sum, p) => sum + p.earned, 0) ?? 0;
  const totalHours =
    hoursByProject?.data.reduce((sum, p) => sum + p.hours, 0) ?? 0;

  return {
    totalProjects,
    totalActiveProjects,
    totalArchivedProjects,
    totalProjectsWithBudget,
    activeProjectsPercent,
    totalHours,
    formattedTotalBudget: formatCurrency(totalBudget),
    formattedTotalEarned: formatCurrency(totalEarned),
  };
};
