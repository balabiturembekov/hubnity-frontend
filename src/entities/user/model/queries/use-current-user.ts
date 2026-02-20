import { useQuery } from "@tanstack/react-query";
import { userService } from "@/entities/user";

export const useCurrentUser = () =>
  useQuery({
    queryKey: ["me"],
    queryFn: userService.getMe,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
