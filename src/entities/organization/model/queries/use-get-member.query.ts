import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useGetOrganizationId } from "@/shared/hooks/use-get-organization-id";
import { organizationService } from "../../api/organization.service";
import type { MemberEntity } from "../organization.types";

export const useGetMemberQuery = (
  memberId: string,
  options?: Partial<UseQueryOptions<MemberEntity, Error>>,
) => {
  const orgId = useGetOrganizationId();

  return useQuery<MemberEntity, Error>({
    queryKey: ["member", orgId, memberId],
    queryFn: () => organizationService.getMember(orgId, memberId),
    ...options,
  });
};
