import { useMemo } from "react";
import { useGetProjectsQuery } from "@/entities/project";
import { useProjectsStore } from "../model/projects.store";

export const useFilteredProjects = () => {
  const { data: projects = [], isLoading, isError } = useGetProjectsQuery();
  const { searchQuery, statusFilter } = useProjectsStore();

  const filteredProjects = useMemo(() => {
    let filtered = [...projects];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((project) =>
        project.name.toLowerCase().includes(query),
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((project) => project.status === statusFilter);
    }

    return filtered;
  }, [projects, searchQuery, statusFilter]);

  const hasActiveFilters = searchQuery.trim() !== "" || statusFilter !== "all";

  return {
    projects: filteredProjects,
    totalCount: projects.length,
    hasActiveFilters,
    isLoading,
    isError,
  };
};
