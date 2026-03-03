import type { DashboardAnalyticsResponse } from "@/entities/dashboard-analytics";
import type { TimeEntryEntity } from "../model/time-entry.types";

interface MapMyTimeEntriesDataParams {
  timeEntries: TimeEntryEntity[] | undefined;
  stats: {
    total: DashboardAnalyticsResponse;
    today: DashboardAnalyticsResponse;
    thisWeek: DashboardAnalyticsResponse;
    thisMonth: DashboardAnalyticsResponse;
    lastMonth: DashboardAnalyticsResponse;
    prev1: DashboardAnalyticsResponse;
    prev2: DashboardAnalyticsResponse;
    prev3: DashboardAnalyticsResponse;
  };
}

export const DEFAULT_ANALYTICS_PERIOD = {
  period: {
    startDate: "",
    endDate: "",
  },
  totalHours: 0,
  totalEarned: 0,
  entriesCount: 0,
  activeUsersCount: 0,
  activeProjectsCount: 0,
};

export const DEFAULT_MY_TIME_ENTRIES_STATE = {
  myEntries: [],
  myActiveEntries: [],
  myTotalStats: DEFAULT_ANALYTICS_PERIOD,
  myTodayStats: DEFAULT_ANALYTICS_PERIOD,
  myThisWeekStats: DEFAULT_ANALYTICS_PERIOD,
  myThisMonthStats: DEFAULT_ANALYTICS_PERIOD,
  myLastMonthStats: DEFAULT_ANALYTICS_PERIOD,
  prev1WeekStats: DEFAULT_ANALYTICS_PERIOD,
  prev2WeekStats: DEFAULT_ANALYTICS_PERIOD,
  prev3WeekStats: DEFAULT_ANALYTICS_PERIOD,
};

export const mapMyTimeEntriesData = ({
  timeEntries,
  stats,
}: MapMyTimeEntriesDataParams) => {
  const myEntries =
    timeEntries?.filter((entry) => entry.status === "STOPPED") ?? [];
  const myActiveEntries =
    timeEntries?.filter((entry) => entry.status === "RUNNING") ?? [];
  return {
    myEntries,
    myActiveEntries,
    myTotalStats: stats.total,
    myTodayStats: stats.today,
    myThisWeekStats: stats.thisWeek,
    myThisMonthStats: stats.thisMonth,
    myLastMonthStats: stats.lastMonth,
    prev1WeekStats: stats.prev1,
    prev2WeekStats: stats.prev2,
    prev3WeekStats: stats.prev3,
  };
};
