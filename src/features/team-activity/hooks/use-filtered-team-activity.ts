import { useGetProjectsQuery } from "@/entities/project";
import {
  TeamActivityPeriod,
  useGetTeamActivityQuery,
} from "@/entities/team-activity";
import { useGetEmployeesQuery } from "@/entities/user";
import { useTeamActivityStore } from "../model/team-activity.store";

export const useFilteredTeamActivity = () => {
  const { period, userId, projectId } = useTeamActivityStore();

  const {
    data: projects = [],
    isLoading: isProjectsLoading,
    isError: isProjectsError,
  } = useGetProjectsQuery();
  const {
    data: employees = [],
    isLoading: isEmployeesLoading,
    isError: isEmployeesError,
  } = useGetEmployeesQuery();
  const {
    data: teamActivity,
    isLoading: isTimeActivityLoading,
    isError: isTimeActivityError,
  } = useGetTeamActivityQuery(
    period,
    userId === "all" ? undefined : userId,
    projectId === "all" ? undefined : projectId,
  );

  const hasActiveFilters =
    period !== TeamActivityPeriod.LAST_30_DAYS ||
    userId !== "all" ||
    projectId !== "all";

  return {
    teamActivity,
    projects,
    employees,
    hasActiveFilters,
    isLoading: isProjectsLoading || isEmployeesLoading || isTimeActivityLoading,
    isError: isProjectsError || isEmployeesError || isTimeActivityError,
  };
};
