import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { authService } from "@/features/auth";
import { handleError } from "@/shared/lib/utils";

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onError: (error) => {
      toast.error(handleError(error, "Failed to logout"));
    },
  });
};
