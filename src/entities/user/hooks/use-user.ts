import { useUserStore } from "../model/user.store";
import { ADMIN_ROLES } from "../model/user.types";

export const useUser = () => {
  const user = useUserStore.getState().user;

  const isAdmin = user ? ADMIN_ROLES.includes(user.role) : false;

  return { user, isAdmin };
};
