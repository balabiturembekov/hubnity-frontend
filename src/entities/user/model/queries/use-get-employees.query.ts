import { useQuery } from "@tanstack/react-query";
import { userService, useUser } from "@/entities/user";
import type { UserEntity } from "../user.types";

export const useGetEmployeesQuery = () => {
  const { isAdmin } = useUser();
  return useQuery<UserEntity[], Error>({
    queryKey: ["employees"],
    queryFn: userService.getAll,
    enabled: isAdmin,
  });
};
