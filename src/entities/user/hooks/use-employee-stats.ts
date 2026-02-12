import { useMemo } from "react";
import { useGetEmployeesQuery } from "../model/queries/use-get-employees.query";

export const useEmployeeStats = () => {
  const { data: users = [], isLoading, isError } = useGetEmployeesQuery();

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((user) => user.status === "ACTIVE").length;
    const inactive = users.filter((user) => user.status === "INACTIVE").length;
    const admins = users.filter(
      (user) =>
        user.role === "ADMIN" ||
        user.role === "OWNER" ||
        user.role === "SUPER_ADMIN",
    ).length;
    const employeesCount = users.filter(
      (user) => user.role === "EMPLOYEE",
    ).length;

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
