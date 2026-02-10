import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useUserStore } from "@/entities/user";
import { handleError } from "@/shared/lib/utils";
import { userService } from "../api/user.service";
import type { UserEntity } from "./user.types";

export const useUpdateProfileMutation = () => {
  const setUser = useUserStore((s) => s.setUser);

  return useMutation<
    UserEntity,
    Error,
    Partial<UserEntity> & { password?: string }
  >({
    mutationKey: ["update-profile"],
    mutationFn: (payload) => userService.updateMyProfile(payload),
    onSuccess: (user) => {
      setUser(user);
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to update profile"));
    },
  });
};
