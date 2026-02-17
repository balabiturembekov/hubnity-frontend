import { create } from "zustand";
import type { DashboardAnalyticsPeriod } from "@/entities/dashboard-analytics";

interface AnalyticsState {
  period: DashboardAnalyticsPeriod;

  setPeriod: (period: DashboardAnalyticsPeriod) => void;
}

export const useAnalyticsStore = create<AnalyticsState>((set) => ({
  period: "7days",

  setPeriod: (period: DashboardAnalyticsPeriod) => set({ period }),
}));
