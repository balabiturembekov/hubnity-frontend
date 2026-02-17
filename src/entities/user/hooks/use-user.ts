import { useUserStore } from "@/entities/user";
import { ADMIN_ROLES } from "@/entities/user/model/user.types";

export const useUser = () => {
  const user = useUserStore((s) => s.user);

  const isAdmin = user ? ADMIN_ROLES.includes(user.role) : false;

  return { user, isAdmin };
};
