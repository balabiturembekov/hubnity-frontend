import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUserStore } from "@/entities/user";
import { handleError } from "@/shared/lib/utils";
import { authService } from "../../api/auth.service";
import type { RegisterReq, RegisterRes } from "../auth.types";

export const useRegisterMutation = () => {
  const setUser = useUserStore((s) => s.setUser);
  const router = useRouter();

  return useMutation<RegisterRes, Error, RegisterReq>({
    mutationKey: ["register"],
    mutationFn: (payload) => authService.register(payload),
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
      toast.error(
        handleError(error, "Registration error! Please try again later"),
      );
    },
  });
};
