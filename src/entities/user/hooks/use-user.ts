import { useUserStore } from "@/entities/user";

export const useUser = () => {
  const { user } = useUserStore();
  const canManage =
    user?.role === "admin" ||
    user?.role === "OWNER" ||
    user?.role === "SUPER_ADMIN";

  return { canManage };
};
