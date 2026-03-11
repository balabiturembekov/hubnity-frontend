import { format, subDays } from "date-fns";
import { useMemo } from "react";
import { useOrganizationRole } from "@/entities/organization";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { useGetTimeEntriesQuery } from "@/entities/time-entry";
import { type UserEntity, useGetCurrentUserQuery } from "@/entities/user";

interface DailyDataPoint {
  date: string;
  fullDate: string;
  hours: number;
  idleHours: number;
}

export const useDailyData = (length: number = 14) => {
  const { data: user } = useGetCurrentUserQuery();
  const { data: timeEntries = [], isPending } = useGetTimeEntriesQuery();
  const { isUser } = useOrganizationRole();

  const last7Days = useMemo(() => {
    return Array.from({ length }, (_, i) => {
      return subDays(new Date(), length - 1 - i);
    });
  }, [length]);

  const dailyData = useMemo<DailyDataPoint[]>(() => {
    if (!timeEntries || !Array.isArray(timeEntries)) {
      return last7Days.map((date) => ({
        date: format(date, "yyyy-MM-dd"),
        fullDate: format(date, "MMM dd"),
        hours: 0,
        idleHours: 0,
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
        isUser,
        user,
      );

      return {
        date: format(date, "yyyy-MM-dd"),
        fullDate: format(date, "MMM dd"),
        hours: Number(totalHours.toFixed(2)),
        idleHours: 0, // Placeholder for future idle time endpoint
      };
    });
  }, [last7Days, timeEntries, user, isUser]);

  return {
    dailyData,
    isPending: isPending && (!timeEntries || timeEntries.length === 0),
  };
};

function calculateDailyTotal(
  timeEntries: TimeEntryEntity[],
  dayStart: Date,
  dayEnd: Date,
  isUser: boolean,
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
  if (user && isUser) {
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
