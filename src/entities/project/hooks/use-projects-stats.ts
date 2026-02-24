import { useMemo } from "react";
import { useGetAnalyticsHoursByProjectQuery } from "@/entities/dashboard-analytics";
import {
  DEFAULT_PROJECTS_STATS,
  mapProjectsStats,
} from "../lib/projects-stats.utils";
import { useGetActiveProjectsQuery } from "../model/queries/use-get-active-projects.query";
import { useGetProjectsQuery } from "../model/queries/use-get-projects.query";

export const useProjectsStats = () => {
  const { data: hoursByProject, isPending: isHoursPending } =
    useGetAnalyticsHoursByProjectQuery();
  const { data: projects, isPending: isProjectsPending } =
    useGetProjectsQuery();
  const { data: activeProjects, isPending: isActivePending } =
    useGetActiveProjectsQuery();

  const stats = useMemo(() => {
    if (!projects || !activeProjects || !hoursByProject) {
      return DEFAULT_PROJECTS_STATS;
    }

    return mapProjectsStats({ projects, activeProjects, hoursByProject });
  }, [projects, activeProjects, hoursByProject]);

  return {
    ...stats,
    isPending: isProjectsPending || isActivePending || isHoursPending,
  };
};
