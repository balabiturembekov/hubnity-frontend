import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { organizationService } from "@/entities/organization/api/organization.service";
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
        secure: true,
      });
      Cookies.set("refresh_token", refresh_token, {
        sameSite: "strict",
        secure: true,
      });

      await queryClient.invalidateQueries({ queryKey: ["me"] });

      // Fetch user's organizations and redirect accordingly
      try {
        const orgs = await organizationService.getMyOrganizations();

        if (orgs.length === 0) {
          router.push("/welcome");
          return;
        }

        const savedOrgId = localStorage.getItem("orgId");
        const validSaved = savedOrgId && orgs.some((o) => o.id === savedOrgId);

        if (validSaved) {
          router.push(`/dashboard/${savedOrgId}`);
        } else {
          localStorage.setItem("orgId", orgs[0].id);
          router.push(`/dashboard/${orgs[0].id}`);
        }
      } catch {
        // If org fetch fails, fallback to welcome
        router.push("/welcome");
      }
    },
    onError: (error) => {
      toast.error(handleError(error, "Login error! Please try again later"));
    },
  });
};
