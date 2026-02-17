import { create } from "zustand/react";
import { TeamActivityPeriod } from "@/entities/team-activity";
import { useUserStore } from "@/entities/user";
import { ADMIN_ROLES } from "@/entities/user/model/user.types";

interface TeamActivityStore {
  period: TeamActivityPeriod;
  userId?: string;
  projectId?: string;

  setPeriod: (period: TeamActivityPeriod) => void;
  setUserId: (userId: string) => void;
  setProjectId: (projectId: string) => void;

  reset: () => void;
}

function getInitialUserId() {
  const user = useUserStore.getState().user;
  const isAdmin = user ? ADMIN_ROLES.includes(user.role) : false;
  return isAdmin ? "all" : user?.id;
}

export const useTeamActivityStore = create<TeamActivityStore>((set) => ({
  period: TeamActivityPeriod.LAST_30_DAYS,
  userId: getInitialUserId(),
  projectId: "all",

  setPeriod: (period: TeamActivityPeriod) => set({ period }),
  setUserId: (userId: string) => set({ userId }),
  setProjectId: (projectId: string) => set({ projectId }),

  reset: () =>
    set({
      period: TeamActivityPeriod.LAST_30_DAYS,
      userId: getInitialUserId(),
      projectId: "all",
    }),
}));
