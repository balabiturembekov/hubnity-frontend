import { useQuery } from "@tanstack/react-query";
import { useGetOrganizationId } from "@/shared/hooks/use-get-organization-id";
import { organizationService } from "../../api/organization.service";
import type { MemberEntity } from "../organization.types";

export const useGetCurrentUserByOrganizationQuery = () => {
  const orgId = useGetOrganizationId();

  return useQuery<MemberEntity, Error>({
    queryKey: ["current-user-by-organization", orgId],
    queryFn: () => organizationService.getCurrentUser(orgId),
  });
};
