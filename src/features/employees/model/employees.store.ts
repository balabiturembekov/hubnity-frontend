import { create } from "zustand";
import type { MemberStatus } from "@/entities/organization";
import type { UserRole } from "@/entities/user";

interface EmployeesState {
  searchQuery: string;
  roleFilter: UserRole | "all";
  statusFilter: MemberStatus | "all";

  setSearchQuery: (query: string) => void;
  setRoleFilter: (role: UserRole | "all") => void;
  setStatusFilter: (status: MemberStatus | "all") => void;
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
