import { api } from "@/shared/config/api";
import type { AddFirstUsersValues } from "../model/schemas/add-first-users.schema";

class InvitationService {
  async sendInvitationLinks(
    data: AddFirstUsersValues & { organizationId: string },
  ) {
    await api.post("/invitations/many", data);
  }
}

export const invitationService = new InvitationService();
