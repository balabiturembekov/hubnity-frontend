import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";
import { invitationService } from "../../api/invitation.service";
import type { AddFirstUsersValues } from "../schemas/add-first-users.schema";

export const useCreateInvitationLinksMutation = () => {
  return useMutation<
    unknown,
    Error,
    AddFirstUsersValues & { organizationId: string }
  >({
    mutationKey: ["invitation-links"],
    mutationFn: (data) => {
      if (!data.organizationId?.trim()) {
        throw new Error("organizationId is required");
      }

      return invitationService.sendInvitationLinks(data);
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to send invitation links"));
    },
    onSuccess: () => {
      toast.success("Invitation links sent successfully");
    },
  });
};
