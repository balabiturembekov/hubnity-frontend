import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/entities/user";
import { handleError } from "@/shared/lib/utils";
import { authService } from "../../api/auth.service";
import type { LoginReq, LoginRes } from "../auth.types";

export const useLoginMutation = () => {
  const setUser = useUserStore((s) => s.setUser);
  const router = useRouter();

  return useMutation<LoginRes, Error, LoginReq>({
    mutationKey: ["login"],
    mutationFn: (payload) => authService.login(payload),
    onSuccess: (data) => {
      const { user, refresh_token, access_token } = data;
      Cookies.set("access_token", access_token, {
        sameSite: "strict",
      });
      Cookies.set("refresh_token", refresh_token, {
        sameSite: "strict",
      });
      router.push("/dashboard");
      setUser(user);
    },
    onError: (error) => {
      toast.error(handleError(error, "Login error! Please try again later"));
    },
  });
};
