import { create } from "zustand";
import type { ProjectStatusType } from "@/entities/project";

interface ProjectsState {
  searchQuery: string;
  statusFilter: ProjectStatusType | "all";

  setSearchQuery: (query: string) => void;
  setStatusFilter: (status: ProjectStatusType | "all") => void;
  resetFilters: () => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  searchQuery: "",
  statusFilter: "all",

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setStatusFilter: (status: ProjectStatusType | "all") =>
    set({ statusFilter: status }),
  resetFilters: () => set({ searchQuery: "", statusFilter: "all" }),
}));
