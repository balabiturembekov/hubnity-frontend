import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/features/auth";
import { queryClient } from "@/shared/config/query-client";
import { handleError } from "@/shared/lib/utils";
import type { ResetPasswordReq, ResetPasswordRes } from "../auth.types";

export const useResetPasswordMutation = () => {
  const router = useRouter();

  return useMutation<ResetPasswordRes, Error, ResetPasswordReq>({
    mutationKey: ["reset-password"],
    mutationFn: (payload) => authService.resetPassword(payload),
    onSuccess: async () => {
      router.push("/login");
    },
    onSettled: () => {
      queryClient.clear();
    },
    onError: (error) => {
      toast.error(
        handleError(error, "Reset password error! Please try again later"),
      );
    },
  });
};
