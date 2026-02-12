import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";
import type { MessageRes } from "@/shared/model/types";
import { authService } from "../../api/auth.service";
import type { ChangePasswordReq } from "../auth.types";

export const useChangePasswordMutation = () => {
  return useMutation<MessageRes, Error, ChangePasswordReq>({
    mutationKey: ["updateProfile"],
    mutationFn: (payload) => authService.changePassword(payload),
    onError: (error) => {
      toast.error(handleError(error, "Failed to update password"));
    },
  });
};
