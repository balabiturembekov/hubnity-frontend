import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/features/auth";
import { handleError } from "@/shared/lib/utils";
import type { RegisterReq, RegisterRes } from "../auth.types";

export const useRegisterMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<RegisterRes, Error, RegisterReq>({
    mutationKey: ["register"],
    mutationFn: (payload) => authService.register(payload),
    onSuccess: async (data) => {
      const { refresh_token, access_token } = data;

      queryClient.clear();

      Cookies.set("access_token", access_token, {
        sameSite: "strict",
      });
      Cookies.set("refresh_token", refresh_token, {
        sameSite: "strict",
      });

      await queryClient.invalidateQueries({
        queryKey: ["me"],
      });

      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(
        handleError(error, "Registration error! Please try again later"),
      );
    },
  });
};
