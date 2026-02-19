import { create } from "zustand";

interface TimeEntriesState {
  searchQuery: string;
  projectId: "all" | "none" | string;
  period: "all" | "today" | "week" | "month";

  setSearchQuery: (query: string) => void;
  setProjectId: (projectId: "all" | "none" | string) => void;
  setPeriod: (period: "all" | "today" | "week" | "month") => void;
  resetFilters: () => void;
}

export const useTimeEntriesStore = create<TimeEntriesState>((set) => ({
  searchQuery: "",
  projectId: "all",
  period: "all",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setProjectId: (projectId) => set({ projectId }),
  setPeriod: (period) => set({ period }),
  resetFilters: () => set({ searchQuery: "", projectId: "all", period: "all" }),
}));
