import { useMemo } from "react";
import { useGetEmployeesQuery } from "@/entities/user";
import { useEmployeesStore } from "../model/employees.store";

export const useFilteredEmployees = () => {
  const { data: employees = [], isLoading, isError } = useGetEmployeesQuery();
  const { searchQuery, roleFilter, statusFilter } = useEmployeesStore();

  const filteredEmployees = useMemo(() => {
    let filtered = [...employees];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query),
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((user) => {
        if (roleFilter === "ADMIN") {
          return (
            user.role === "ADMIN" ||
            user.role === "OWNER" ||
            user.role === "SUPER_ADMIN"
          );
        }
        return user.role === roleFilter;
      });
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((user) => user.status === statusFilter);
    }

    return filtered;
  }, [employees, searchQuery, roleFilter, statusFilter]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || roleFilter !== "all" || statusFilter !== "all";

  return {
    employees: filteredEmployees,
    totalCount: employees.length,
    hasActiveFilters,
    isLoading,
    isError,
  };
};
