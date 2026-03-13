import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { organizationService } from "../../api/organization.service";
import type { OrganizationEntity } from "../organization.types";

type UseGetOrganizationOptions = Omit<
  UseQueryOptions<OrganizationEntity>,
  "queryKey" | "queryFn"
>;

export const useGetOrganizationQuery = (
  orgId: string,
  options?: UseGetOrganizationOptions,
) => {
  return useQuery<OrganizationEntity>({
    queryKey: ["organization", orgId],
    queryFn: () => organizationService.getOrganization(orgId),
    enabled: Boolean(orgId),
    ...options,
  });
};
