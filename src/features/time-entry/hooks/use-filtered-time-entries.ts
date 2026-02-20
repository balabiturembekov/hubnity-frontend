import { useMemo } from "react";
import { useGetTimeEntriesQuery } from "@/entities/time-entry";
import { useTimeEntriesStore } from "@/features/time-entry";

export const useFilteredTimeEntries = (userId?: string) => {
  const {
    data: timeEntries = [],
    isLoading,
    isError,
    refetch,
  } = useGetTimeEntriesQuery({ userId });
  const { searchQuery, projectId, period } = useTimeEntriesStore();

  const filteredTimeEntries = useMemo(() => {
    let filtered = [...timeEntries];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (timeEntry) =>
          timeEntry.user.name.toLowerCase().includes(query) ||
          timeEntry.user.email.toLowerCase().includes(query),
      );
    }

    if (projectId !== "all") {
      if (projectId === "none") {
        filtered = filtered.filter((timeEntry) => !timeEntry.projectId);
      } else {
        filtered = filtered.filter(
          (timeEntry) => timeEntry.projectId === projectId,
        );
      }
    }

    if (period !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (period === "today") {
        filtered = filtered.filter((timeEntry) => {
          const entryDate = new Date(timeEntry.startTime);
          return entryDate >= today;
        });
      } else if (period === "week") {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);

        filtered = filtered.filter((timeEntry) => {
          const entryDate = new Date(timeEntry.startTime);
          return entryDate >= weekAgo;
        });
      } else if (period === "month") {
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        filtered = filtered.filter((timeEntry) => {
          const entryDate = new Date(timeEntry.startTime);
          return entryDate >= monthAgo;
        });
      }
    }

    return filtered;
  }, [timeEntries, searchQuery, projectId, period]);

  const hasActiveFilters =
    searchQuery.trim() !== "" || projectId !== "all" || period !== "all";

  return {
    timeEntries: filteredTimeEntries,
    totalCount: filteredTimeEntries.length,
    hasActiveFilters,
    isLoading,
    refetch,
    isError,
  };
};
