import { useCurrentUser } from "@/entities/user";
import { ADMIN_ROLES } from "@/entities/user/model/user.types";

export const useUser = () => {
  const { data: user, isPending } = useCurrentUser();

  const isAdmin = user ? ADMIN_ROLES.includes(user.role) : false;

  return { user, isAdmin, isPending };
};
