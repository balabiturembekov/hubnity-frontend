import { useQuery } from "@tanstack/react-query";
import { inviteLinkService } from "../../api/invite-link.service";
import type { OrganizationByTokenEntity } from "../invite-link.types";

export const useGetOrganizationByInviteTokenQuery = (token: string) => {
  return useQuery<OrganizationByTokenEntity, Error>({
    queryKey: ["organization-by-token", token],
    queryFn: () => inviteLinkService.getOrganizationByInviteToken(token),
    enabled: Boolean(token),
  });
};
