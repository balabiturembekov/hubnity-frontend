import { create } from "zustand/react";
import { TeamActivityPeriod } from "@/entities/team-activity";

interface TeamActivityStore {
  period: TeamActivityPeriod;
  userId?: string;
  projectId?: string;

  setPeriod: (period: TeamActivityPeriod) => void;
  setUserId: (userId: string) => void;
  setProjectId: (projectId: string) => void;

  reset: () => void;
}

export const useTeamActivityStore = create<TeamActivityStore>((set) => ({
  period: TeamActivityPeriod.LAST_30_DAYS,
  userId: "all",
  projectId: "all",

  setPeriod: (period: TeamActivityPeriod) => set({ period }),
  setUserId: (userId: string) => set({ userId }),
  setProjectId: (projectId: string) => set({ projectId }),

  reset: () =>
    set({
      period: TeamActivityPeriod.LAST_30_DAYS,
      userId: "all",
      projectId: "all",
    }),
}));
