"use client";

import { useQuery } from "@tanstack/react-query";
import { useGetOrganizationId } from "@/shared/hooks/use-get-organization-id";
import { organizationService } from "../../api/organization.service";
import type { MemberEntity } from "../organization.types";

export const useGetMembersQuery = () => {
  const orgId = useGetOrganizationId();

  return useQuery<MemberEntity[]>({
    queryKey: ["members", orgId],
    queryFn: () => organizationService.getMembers(orgId),
    enabled: !!orgId,
  });
};
