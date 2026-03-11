import { useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { type UserEntity, userService } from "@/entities/user";

export const useGetCurrentUserQuery = () =>
  useQuery<UserEntity, Error>({
    queryKey: ["me"],
    queryFn: userService.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
    enabled: !!Cookies.get("access_token"),
  });
