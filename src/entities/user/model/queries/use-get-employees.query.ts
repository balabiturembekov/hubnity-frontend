import { useQuery } from "@tanstack/react-query";
import { userService } from "@/entities/user";
import type { UserEntity } from "../user.types";

export const useGetEmployeesQuery = () => {
  return useQuery<UserEntity[], Error>({
    queryKey: ["employees"],
    queryFn: userService.getAll,
  });
};
