import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { OrganizationGoalEntity } from "@/entities/organization-goal";
import { organizationService } from "../../api/organization.service";
import type { AddOrganizationGoalsValues } from "../schemas/add-organization-goals.schema";

export const useAddOrganizationGoalsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    OrganizationGoalEntity[],
    Error,
    AddOrganizationGoalsValues & { orgId: string }
  >({
    mutationKey: ["add-organization-goals"],
    mutationFn: ({ orgId, goalsIds }) =>
      organizationService.addOrganizationGoals(orgId, goalsIds),
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["organization-goals", variables.orgId], data);
      queryClient.invalidateQueries({
        queryKey: ["organization-goals", variables.orgId],
      });
    },
  });
};
