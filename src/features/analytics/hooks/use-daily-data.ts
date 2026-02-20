import { format, subDays } from "date-fns";
import { useMemo } from "react";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { useGetTimeEntriesQuery } from "@/entities/time-entry";
import { type UserEntity, useCurrentUser } from "@/entities/user";

interface DailyDataPoint {
  date: string;
  fullDate: string;
  hours: number;
}

export const useDailyData = () => {
  const { data: user } = useCurrentUser();
  const { data: timeEntries = [], isPending } = useGetTimeEntriesQuery();

  const last7Days = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      return subDays(new Date(), 6 - i);
    });
  }, []);

  const dailyData = useMemo<DailyDataPoint[]>(() => {
    if (!timeEntries || !Array.isArray(timeEntries)) {
      return last7Days.map((date) => ({
        date: format(date, "EEE"),
        fullDate: format(date, "MMM dd"),
        hours: 0,
      }));
    }

    return last7Days.map((date) => {
      const dayStart = new Date(date);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(date);
      dayEnd.setHours(23, 59, 59, 999);

      const totalHours = calculateDailyTotal(
        timeEntries,
        dayStart,
        dayEnd,
        user,
      );

      return {
        date: format(date, "EEE"),
        fullDate: format(date, "MMM dd"),
        hours: Number(totalHours.toFixed(2)),
      };
    });
  }, [last7Days, timeEntries, user]);

  return {
    dailyData,
    isPending: isPending && (!timeEntries || timeEntries.length === 0),
  };
};

function calculateDailyTotal(
  timeEntries: TimeEntryEntity[],
  dayStart: Date,
  dayEnd: Date,
  user?: UserEntity,
): number {
  // Filter entries for this day
  let entriesInDay = timeEntries.filter((entry) => {
    try {
      const entryDate = new Date(entry.startTime);
      if (Number.isNaN(entryDate.getTime())) return false;
      return (
        entryDate >= dayStart &&
        entryDate <= dayEnd &&
        entry.status === "STOPPED"
      );
    } catch {
      return false;
    }
  });

  // Filter by user role
  if (
    user &&
    user.role !== "ADMIN" &&
    user.role !== "OWNER" &&
    user.role !== "SUPER_ADMIN"
  ) {
    entriesInDay = entriesInDay.filter((entry) => entry.userId === user.id);
  }

  // Calculate total hours for this day
  return entriesInDay.reduce((acc, entry) => {
    const duration = entry.duration || 0;
    if (!Number.isFinite(duration) || Number.isNaN(duration) || duration < 0) {
      return acc;
    }
    return acc + duration / 3600;
  }, 0);
}
