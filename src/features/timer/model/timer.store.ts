import { create } from "zustand";
import type {
  TimeEntryEntity,
  TimeEntryStatusType,
} from "@/entities/time-entry";

type TimerStatus = "IDLE" | TimeEntryStatusType;

interface TimerState {
  status: TimerStatus;
  activeEntryId: string | null;
  projectId: "none" | string;
  isLoading: boolean;

  setFromEntry: (entry: TimeEntryEntity | null) => void;
  setProjectId: (projectId: "none" | string) => void;
  setLoading: (isLoading: boolean) => void;
  reset: () => void;
}

const initialState: Pick<
  TimerState,
  "status" | "activeEntryId" | "projectId" | "isLoading"
> = {
  status: "IDLE",
  activeEntryId: null,
  projectId: "none",
  isLoading: false,
};

export const useTimerStore = create<TimerState>((set) => ({
  ...initialState,

  setFromEntry: (entry) =>
    set((state) => {
      if (!entry) {
        return { ...state, ...initialState };
      }

      return {
        ...state,
        status: entry.status,
        activeEntryId: entry.id,
        projectId: entry.projectId ?? "none",
      };
    }),

  setProjectId: (projectId) => set({ projectId }),

  setLoading: (isLoading) => set({ isLoading }),

  reset: () => set(initialState),
}));
