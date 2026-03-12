import { useQuery } from "@tanstack/react-query";
import { inviteLinkService } from "../../api/invite-link.service";
import type { InviteLinkEntity } from "../invite-link.types";

export const inviteLinkQueryKey = (orgId: string) =>
  ["invite-link", orgId] as const;

export const useGetInviteLinkQuery = (orgId: string | null) => {
  return useQuery<InviteLinkEntity, Error>({
    queryKey: orgId ? inviteLinkQueryKey(orgId) : ["invite-link", "empty"],
    enabled: Boolean(orgId),
    queryFn: async () =>
      inviteLinkService.createInviteLink({ orgId: orgId as string }),
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
    retry: false,
  });
};
