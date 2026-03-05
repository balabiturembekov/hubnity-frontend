import {
  endOfMonth,
  endOfWeek,
  endOfYear,
  format,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subMonths,
} from "date-fns";
import {
  Calendar,
  CalendarArrowDown,
  Calendars,
  FileText,
  type LucideIcon,
  TrendingUp,
} from "lucide-react";
import { formatDurationFull } from "@/shared/lib/utils";

export type ProfileStatisticId =
  | "today"
  | "this-week"
  | "this-month"
  | "last-month"
  | "this-year";

interface ProfileStatistic {
  id: ProfileStatisticId;
  label: string;
  icon: LucideIcon;
  colorClasses: string;

  getDateValue: () => string;
  formatHours: (hours: number) => string;
}

export const PROFILE_STATISTICS: ProfileStatistic[] = [
  {
    id: "today",
    label: "Today",
    icon: Calendar,
    colorClasses: "bg-blue-500/10 text-blue-600 group-hover:bg-blue-500",

    getDateValue: () => format(new Date(), "MMM d"),
    formatHours: (hours: number) => formatDurationFull(hours * 3600),
  },
  {
    id: "this-week",
    label: "This Week",
    icon: TrendingUp,
    colorClasses: "bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-500",
    getDateValue: () => {
      const now = new Date();

      return `${format(
        startOfWeek(now, { weekStartsOn: 1 }),
        "MMM d",
      )} - ${format(endOfWeek(now, { weekStartsOn: 1 }), "MMM d")}`;
    },
    formatHours: (hours: number) => `${hours}h`,
  },
  {
    id: "this-month",
    label: "This Month",
    icon: FileText,
    colorClasses: "bg-purple-500/10 text-purple-600 group-hover:bg-purple-500",
    getDateValue: () => {
      const now = new Date();

      return `${format(startOfMonth(now), "MMM d")} - ${format(
        endOfMonth(now),
        "MMM d",
      )}`;
    },
    formatHours: (hours: number) => `${hours}h`,
  },
  {
    id: "last-month",
    label: "Last Month",
    icon: CalendarArrowDown,
    colorClasses: "bg-teal-500/10 text-teal-600 group-hover:bg-teal-500",
    getDateValue: () => {
      const now = new Date();

      return `${format(startOfMonth(subMonths(now, 1)), "MMM d")} - ${format(
        endOfMonth(subMonths(now, 1)),
        "MMM d",
      )}`;
    },
    formatHours: (hours: number) => `${hours}h`,
  },
  {
    id: "this-year",
    label: "This Year",
    icon: Calendars,
    colorClasses: "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500",
    getDateValue: () => {
      const now = new Date();

      return `${format(startOfYear(now), "MMM d")} - ${format(
        endOfYear(now),
        "MMM d",
      )}`;
    },
    formatHours: (hours: number) => `${hours}h`,
  },
];
