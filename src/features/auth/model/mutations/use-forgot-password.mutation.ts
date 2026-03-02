import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/features/auth";
import { queryClient } from "@/shared/config/query-client";
import { handleError } from "@/shared/lib/utils";
import type { ForgotPasswordReq, ForgotPasswordRes } from "../auth.types";

export const useForgotPasswordMutation = () => {
  return useMutation<ForgotPasswordRes, Error, ForgotPasswordReq>({
    mutationKey: ["forgot-password"],
    mutationFn: (payload) => authService.forgotPassword(payload),
    onSettled: async () => {
      queryClient.clear();
    },
    onError: (error) => {
      toast.error(
        handleError(error, "Forgot password error! Please try again later"),
      );
    },
  });
};
