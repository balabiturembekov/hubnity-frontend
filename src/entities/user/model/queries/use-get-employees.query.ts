import { useQuery } from "@tanstack/react-query";
import { userService } from "../../api/user.service";
import type { UserEntity } from "../user.types";

export const useGetEmployeesQuery = () => {
  return useQuery<UserEntity[], Error>({
    queryKey: ["employees"],
    queryFn: userService.getAll,
  });
};
