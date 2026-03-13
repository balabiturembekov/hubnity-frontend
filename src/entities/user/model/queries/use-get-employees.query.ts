import { useQuery } from "@tanstack/react-query";
import { useOrganizationRole } from "@/entities/organization";
import { userService } from "@/entities/user";
import type { UserEntity } from "../user.types";

export const useGetEmployeesQuery = () => {
  const isUser = useOrganizationRole().isUser;
  return useQuery<UserEntity[], Error>({
    queryKey: ["employees"],
    queryFn: userService.getAll,
    enabled: !isUser,
  });
};
