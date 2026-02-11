import { create } from "zustand/react";
import type { UserRole, UserStatus } from "@/entities/user";

interface EmployeesState {
  searchQuery: string;
  roleFilter: UserRole | "all";
  statusFilter: UserStatus | "all";

  setSearchQuery: (query: string) => void;
  setRoleFilter: (role: UserRole | "all") => void;
  setStatusFilter: (status: UserStatus | "all") => void;
  resetFilters: () => void;
}

export const useEmployeesStore = create<EmployeesState>((set) => ({
  searchQuery: "",
  roleFilter: "all",
  statusFilter: "all",

  setSearchQuery: (query) => set({ searchQuery: query }),
  setRoleFilter: (role) => set({ roleFilter: role }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  resetFilters: () =>
    set({ searchQuery: "", roleFilter: "all", statusFilter: "all" }),
}));
