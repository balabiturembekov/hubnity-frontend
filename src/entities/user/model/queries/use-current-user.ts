import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { userService } from "@/entities/user";

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: userService.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !!Cookies.get("access_token"),
  });
