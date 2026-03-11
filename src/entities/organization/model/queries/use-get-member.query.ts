import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { organizationService } from "../../api/organization.service";
import type { MemberEntity } from "../organization.types";

export const useGetMemberQuery = (
  // TODO: remove default values
  orgId: string = "123123",
  memberId: string,
  options?: Partial<UseQueryOptions<MemberEntity, Error>>,
) => {
  return useQuery<MemberEntity, Error>({
    queryKey: ["member", orgId, memberId],
    queryFn: () => organizationService.getMember(orgId, memberId),
    ...options,
  });
};
