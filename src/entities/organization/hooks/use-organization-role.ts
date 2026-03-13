"use client";

import { useGetCurrentUserByOrganizationQuery } from "../model/queries/use-get-current-user-by-organization.query";

export const useOrganizationRole = () => {
  const { data: currentUser, isPending: isCurrentUserPending } =
    useGetCurrentUserByOrganizationQuery();

  return {
    role: currentUser?.role,
    isPending: isCurrentUserPending,
    isOwner: currentUser?.role === "OWNER",
    isAdmin: currentUser?.role === "ADMIN",
    isManager: currentUser?.role === "MANAGER",
    isUser: currentUser?.role === "USER",
  };
};
