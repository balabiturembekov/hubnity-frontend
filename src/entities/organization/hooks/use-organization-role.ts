import { useGetCurrentUserQuery } from "@/entities/user";
import { useGetMemberQuery } from "../model/queries/use-get-member.query";

// TODO: remove default values
export const useOrganizationRole = (orgId: string = "123123") => {
  const { data: currentUser, isPending: isUserPending } =
    useGetCurrentUserQuery();
  const { data: member, isPending: isMemberPending } = useGetMemberQuery(
    orgId,
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
