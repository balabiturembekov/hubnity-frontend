import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";
import { authService } from "../../api/auth.service";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["logout"],
    mutationFn: () => authService.logout(),
    onSettled: () => {
      queryClient.clear();
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to logout"));
    },
  });
};
