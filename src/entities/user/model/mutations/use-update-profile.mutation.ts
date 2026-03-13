import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { userService } from "@/entities/user";
import { handleError } from "@/shared/lib/utils";
import type { PatchUserReq, UserEntity } from "../user.types";

export const useUpdateProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UserEntity, Error, PatchUserReq>({
    mutationKey: ["update-profile"],
    mutationFn: (payload) => userService.updateMyProfile(payload),
    onSuccess: () => {
      toast.success("Profile updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["current-user-by-organization"],
      });
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to update profile"));
    },
  });
};
