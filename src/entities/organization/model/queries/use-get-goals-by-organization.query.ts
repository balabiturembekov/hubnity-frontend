import { useQuery } from "@tanstack/react-query";
import type { OrganizationGoalEntity } from "@/entities/organization-goal";
import { organizationService } from "../../api/organization.service";

export const useGetGoalsByOrganization = (orgId: string) => {
  return useQuery<OrganizationGoalEntity[]>({
    queryKey: ["organization-goals", orgId],
    queryFn: () => organizationService.getGoals(orgId),
    enabled: Boolean(orgId),
  });
};
