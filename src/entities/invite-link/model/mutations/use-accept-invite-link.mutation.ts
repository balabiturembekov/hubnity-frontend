import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";
import { inviteLinkService } from "../../api/invite-link.service";

const getErrorStatus = (error: unknown): number | undefined => {
  if (error instanceof AxiosError) {
    return error.response?.status;
  }

  return undefined;
};

export const useAcceptInviteLinkMutation = () => {
  return useMutation<unknown, unknown, { token: string }>({
    mutationKey: ["accept-invite-link"],
    mutationFn: ({ token }) => inviteLinkService.acceptInviteLink(token),
    onSuccess: () => {
      toast.success("Invite link accepted successfully");
    },
    onError: (error) => {
      const status = getErrorStatus(error);

      if (status === 409) {
        toast.info("User already joined this organization");
        return;
      }

      toast.error(handleError(error, "Failed to accept invite link"));
    },
  });
};
