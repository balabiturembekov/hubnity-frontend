import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authService } from "@/features/auth";
import { queryClient } from "@/shared/config/query-client";
import { handleError } from "@/shared/lib/utils";
import type { LoginReq, LoginRes } from "../auth.types";

export const useLoginMutation = () => {
  const router = useRouter();

  return useMutation<LoginRes, Error, LoginReq>({
    mutationKey: ["login"],
    mutationFn: (payload) => authService.login(payload),
    onSuccess: async (data) => {
      const { refresh_token, access_token } = data;

      queryClient.clear();

      Cookies.set("access_token", access_token, {
        sameSite: "strict",
      });
      Cookies.set("refresh_token", refresh_token, {
        sameSite: "strict",
      });

      await queryClient.invalidateQueries({ queryKey: ["me"] });

      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(handleError(error, "Login error! Please try again later"));
    },
  });
};
