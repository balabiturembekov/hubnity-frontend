import { useQuery } from "@tanstack/react-query";
import { organizationService } from "../../api/organization.service";
import type { MemberEntity } from "../organization.types";

// TODO: remove default values
export const useGetMembersQuery = (orgId: string = "123123") => {
  return useQuery<MemberEntity[]>({
    queryKey: ["members", orgId],
    queryFn: () => organizationService.getMembers(orgId),
  });
};
