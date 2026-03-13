import { useMemo } from "react";
import { useGetMembersQuery } from "@/entities/organization";
import { useEmployeesStore } from "../model/employees.store";

export const useFilteredEmployees = () => {
  const { data: employees = [], isLoading, isError } = useGetMembersQuery();
  const { searchQuery, roleFilter, statusFilter } = useEmployeesStore();

  const filteredEmployees = useMemo(() => {
    let filtered = [...employees];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (employee) =>
          employee.user.firstName.toLowerCase().includes(query) ||
          employee.user.lastName.toLowerCase().includes(query) ||
          employee.user.email.toLowerCase().includes(query),
      );
    }

    if (roleFilter !== "all") {
      filtered = filtered.filter((employee) => employee.role === roleFilter);
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
