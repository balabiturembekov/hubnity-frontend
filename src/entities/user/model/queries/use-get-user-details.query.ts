import { useQuery } from "@tanstack/react-query";
import { userService } from "@/entities/user";

export const useGetUserDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ["userDetails", id],
    queryFn: () => userService.getUserDetails(id),
  });
