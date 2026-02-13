import { TeamActivityPeriod } from "../model/team-activity.types";

export const periodsLabels = {
  [TeamActivityPeriod.TODAY]: "Today",
  [TeamActivityPeriod.YESTERDAY]: "Yesterday",
  [TeamActivityPeriod.LAST_7_DAYS]: "Last 7 days",
  [TeamActivityPeriod.LAST_30_DAYS]: "Last 30 days",
  [TeamActivityPeriod.LAST_90_DAYS]: "Last 90 days",
  [TeamActivityPeriod.THIS_MONTH]: "This month",
  [TeamActivityPeriod.LAST_MONTH]: "Last month",
  [TeamActivityPeriod.THIS_YEAR]: "This year",
};
