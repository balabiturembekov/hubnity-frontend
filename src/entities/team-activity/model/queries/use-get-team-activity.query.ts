import { useQuery } from "@tanstack/react-query";
import { teamActivityService } from "../../api/team-activity.service";

export const useGetTeamActivityQuery = (
  period: string,
  userId?: string,
  projectId?: string,
) => {
  return useQuery({
    queryKey: ["team-activity", { period, userId, projectId }],
    queryFn: () =>
      teamActivityService.getTeamActivity(period, userId, projectId),
  });
};
