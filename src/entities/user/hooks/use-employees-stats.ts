import { useMemo } from "react";
import { useGetMembersQuery } from "@/entities/organization";

export const useEmployeesStats = () => {
  const { data: users = [], isLoading, isError } = useGetMembersQuery();

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((user) => user.status === "ACTIVE").length;
    const inactive = users.filter((user) => user.status === "INACTIVE").length;
    const admins = users.filter(
      (user) =>
        user.role === "MANAGER" ||
        user.role === "ADMIN" ||
        user.role === "OWNER",
    ).length;
    const employeesCount = users.filter((user) => user.role === "USER").length;

    const withRate = users.filter(
      (user) => user.hourlyRate && user.hourlyRate > 0,
    ).length;

    const avgRate =
      total > 0
        ? users.reduce((sum, user) => sum + (user.hourlyRate || 0), 0) / total
        : 0;

    return {
      total,
      active,
      inactive,
      admins,
      employees: employeesCount,
      withRate,
      avgRate,
    };
  }, [users]);

  return {
    stats,
    isLoading,
    isError,
  };
};
