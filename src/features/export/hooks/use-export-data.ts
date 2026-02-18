import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { useGetProjectsQuery } from "@/entities/project";
import { useGetTimeEntriesQuery } from "@/entities/time-entry";
import { useGetEmployeesQuery, useUserStore } from "@/entities/user";
import { exportProjectStatsToCSV } from "@/features/project/lib/export-projects-stats";
import { exportTimeEntriesToCSV } from "@/features/time-entry/lib/export-time-entries";
import { exportUserStatsToCSV } from "@/features/user/lib/export-user-stats";
import { handleError } from "@/shared/lib/utils";

export type ExportType = "entries" | "users" | "projects";

export const useExportData = () => {
  const { user: currentUser } = useUserStore();
  const { data: timeEntries } = useGetTimeEntriesQuery();
  const { data: projects } = useGetProjectsQuery();
  const { data: users } = useGetEmployeesQuery();

  const [exportType, setExportType] = useState<ExportType>("entries");
  const [userFilter, setUserFilter] = useState<string>("all");
  const [projectFilter, setProjectFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("all");

  const isAdmin = useMemo(
    () =>
      currentUser?.role === "ADMIN" ||
      currentUser?.role === "OWNER" ||
      currentUser?.role === "SUPER_ADMIN",
    [currentUser],
  );

  const isEmployee = useMemo(
    () => currentUser?.role === "EMPLOYEE",
    [currentUser],
  );

  const filteredEntries = useMemo(() => {
    if (!timeEntries) return [];

    let filtered = [...timeEntries];

    // Filter by user (members only see their own)
    if (isEmployee) {
      filtered = filtered.filter((e) => e.userId === currentUser?.id);
    } else if (userFilter !== "all") {
      filtered = filtered.filter((e) => e.userId === userFilter);
    }

    // Filter by project
    if (projectFilter !== "all") {
      if (projectFilter === "none") {
        filtered = filtered.filter((e) => !e.projectId);
      } else {
        filtered = filtered.filter((e) => e.projectId === projectFilter);
      }
    }

    // Filter by date
    if (dateFilter !== "all") {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      if (dateFilter === "today") {
        filtered = filtered.filter((e) => new Date(e.startTime) >= today);
      } else if (dateFilter === "week") {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter((e) => new Date(e.startTime) >= weekAgo);
      } else if (dateFilter === "month") {
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        filtered = filtered.filter((e) => new Date(e.startTime) >= monthAgo);
      } else if (dateFilter === "year") {
        const yearAgo = new Date(today);
        yearAgo.setFullYear(yearAgo.getFullYear() - 1);
        filtered = filtered.filter((e) => new Date(e.startTime) >= yearAgo);
      }
    }

    return filtered;
  }, [
    timeEntries,
    isEmployee,
    currentUser?.id,
    userFilter,
    projectFilter,
    dateFilter,
  ]);

  const handleExport = useCallback(() => {
    try {
      const timestamp = new Date().toISOString().split("T")[0];
      let filename = "";

      switch (exportType) {
        case "entries":
          filename = `time-entries-${timestamp}.csv`;
          exportTimeEntriesToCSV(filteredEntries, filename);
          break;
        case "users":
          if (!users || !timeEntries) {
            toast.error("Users or time entries data not available");
            throw new Error("Users or time entries data not available");
          }
          filename = `user-statistics-${timestamp}.csv`;
          exportUserStatsToCSV(users, timeEntries, filename);
          break;
        case "projects":
          if (!projects || !timeEntries) {
            toast.error("Projects or time entries data not available");
            throw new Error("Projects or time entries data not available");
          }
          filename = `project-statistics-${timestamp}.csv`;
          exportProjectStatsToCSV(projects, timeEntries, filename);
          break;
      }

      toast.success(`Exported ${exportType} to ${filename}`);
      return true;
    } catch (error) {
      toast.error(handleError(error, "Failed to export data"));
      return false;
    }
  }, [exportType, filteredEntries, users, timeEntries, projects]);

  return {
    exportType,
    setExportType,
    userFilter,
    setUserFilter,
    projectFilter,
    setProjectFilter,
    dateFilter,
    setDateFilter,
    handleExport,
    isAdmin,
    isEmployee,
    users,
    projects,
  };
};
