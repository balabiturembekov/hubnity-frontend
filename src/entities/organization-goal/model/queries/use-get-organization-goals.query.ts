import { useQuery } from "@tanstack/react-query";
import { organizationGoalService } from "../../api/organization-goal.service";
import type { OrganizationGoalEntity } from "../organization-goal.types";

export const useGetOrganizationGoalsQuery = () => {
  return useQuery<OrganizationGoalEntity[], Error>({
    queryKey: ["organization-goals"],
    queryFn: organizationGoalService.getOrganizationGoals,
  });
};
