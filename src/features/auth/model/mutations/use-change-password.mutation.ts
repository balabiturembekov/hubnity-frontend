import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/features/auth";
import type { ChangePasswordReq } from "@/features/auth/model/auth.types";
import { handleError } from "@/shared/lib/utils";
import type { MessageRes } from "@/shared/model/types";

export const useChangePasswordMutation = () => {
  return useMutation<MessageRes, Error, ChangePasswordReq>({
    mutationKey: ["updateProfile"],
    mutationFn: (payload) => authService.changePassword(payload),
    onError: (error) => {
      toast.error(handleError(error, "Failed to update password"));
    },
  });
};
