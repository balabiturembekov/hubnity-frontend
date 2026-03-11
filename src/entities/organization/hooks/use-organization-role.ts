"use client";

import { useGetCurrentUserQuery } from "@/entities/user";
import { useGetOrganizationId } from "@/shared/hooks/use-get-organization-id";
import { useGetMemberQuery } from "../model/queries/use-get-member.query";

export const useOrganizationRole = () => {
  const orgId = useGetOrganizationId();

  const { data: currentUser, isPending: isUserPending } =
    useGetCurrentUserQuery();
  const { data: member, isPending: isMemberPending } = useGetMemberQuery(
    currentUser?.id as string,
    { enabled: !!currentUser?.id && !!orgId },
  );

  return {
    role: member?.role,
    isPending: isUserPending || isMemberPending,
    isOwner: member?.role === "OWNER",
    isAdmin: member?.role === "ADMIN",
    isManager: member?.role === "MANAGER",
    isUser: member?.role === "USER",
  };
};
