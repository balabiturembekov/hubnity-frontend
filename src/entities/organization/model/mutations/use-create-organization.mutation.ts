import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";
import { organizationService } from "../../api/organization.service";
import type { OrganizationEntity } from "../organization.types";
import type { CreateOrganizationValues } from "../schemas/create-organization.schema";

export const useCreateOrganizationMutation = () => {
  return useMutation<OrganizationEntity, Error, CreateOrganizationValues>({
    mutationKey: ["create-organization"],
    mutationFn: (payload) => organizationService.createOrganization(payload),
    onError: (error) => {
      toast.error(handleError(error, "Failed to create organization"));
    },
  });
};
