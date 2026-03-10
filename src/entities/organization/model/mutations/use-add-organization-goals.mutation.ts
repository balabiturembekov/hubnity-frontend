import { useMutation } from "@tanstack/react-query";
import type { OrganizationGoalEntity } from "@/entities/organization-goal";
import { organizationService } from "../../api/organization.service";
import type { AddOrganizationGoalsValues } from "../schemas/add-organization-goals.schema";

export const useAddOrganizationGoalsMutation = () => {
  return useMutation<
    OrganizationGoalEntity[],
    Error,
    AddOrganizationGoalsValues & { orgId: string }
  >({
    mutationKey: ["add-organization-goals"],
    mutationFn: ({ orgId, goalsIds }) =>
      organizationService.addOrganizationGoals(orgId, goalsIds),
  });
};
