import type { AxiosResponse } from "axios";
import { api } from "@/shared/config/api";
import type {
  CreateInviteLinkReq,
  InviteLinkEntity,
} from "../model/invite-link.types";

class InviteLinkService {
  async createInviteLink({ orgId }: { orgId: string }) {
    const res = await api.post<
      InviteLinkEntity,
      AxiosResponse<InviteLinkEntity>,
      CreateInviteLinkReq
    >("/invite-link/links", {
      organizationId: orgId,
      role: "USER",
      maxUses: 10,
      expiresInDays: 7,
    });

    return res.data;
  }
}

export const inviteLinkService = new InviteLinkService();
