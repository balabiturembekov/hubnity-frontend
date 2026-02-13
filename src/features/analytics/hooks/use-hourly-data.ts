"use client";

import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { useGetTimeEntriesQuery } from "@/entities/time-entry";
import { useUserStore } from "@/entities/user";

interface HourlyDataPoint {
  time: string;
  hours: number;
}

export const useHourlyData = () => {
  const { user } = useUserStore();
  const { data: timeEntries = [], isPending } = useGetTimeEntriesQuery();
  const [currentTime, setCurrentTime] = useState(0);

  // Initialize currentTime on mount to avoid hydration mismatch
  useEffect(() => {
    setCurrentTime(Date.now());
  }, []);

  const last24Hours = useMemo(() => {
    const hour = new Date();
    return Array.from({ length: 24 }, (_, i) => {
      const h = new Date(hour);
      h.setHours(h.getHours() - (23 - i), 0, 0, 0);
      return h;
    });
  }, []);

  const hourlyData = useMemo<HourlyDataPoint[]>(() => {
    if (currentTime === 0) {
      // Return empty data until currentTime is initialized
      return last24Hours.map((hour) => ({
        time: format(hour, "HH:mm"),
        hours: 0,
      }));
    }

    if (!timeEntries || !Array.isArray(timeEntries)) {
      return last24Hours.map((hour) => ({
        time: format(hour, "HH:mm"),
        hours: 0,
      }));
    }

    return last24Hours.map((hour) => {
      const hourStart = hour.getTime();
      const hourEnd = hourStart + 3600000;

      const totalHours = calculateHourlyTotal(
        timeEntries,
        hourStart,
        hourEnd,
        currentTime,
        user,
      );

      return {
        time: format(hour, "HH:mm"),
        hours: Number(totalHours.toFixed(2)),
      };
    });
  }, [last24Hours, timeEntries, user, currentTime]);

  return {
    hourlyData,
    isPending: isPending && (!timeEntries || timeEntries.length === 0),
  };
};

function calculateHourlyTotal(
  timeEntries: TimeEntryEntity[],
  hourStart: number,
  hourEnd: number,
  currentTime: number,
  user: { id: string; role: string } | null,
): number {
  // Filter entries for this hour
  let entriesInHour = timeEntries.filter((entry) => {
    try {
      const entryStartDate = new Date(entry.startTime);
      if (Number.isNaN(entryStartDate.getTime())) return false;

      const entryStart = entryStartDate.getTime();
      const entryEnd = entry.endTime
        ? (() => {
            const endDate = new Date(entry.endTime);
            return Number.isNaN(endDate.getTime())
              ? currentTime
              : endDate.getTime();
          })()
        : currentTime;

      if (entry.status === "RUNNING") {
        return entryStart < hourEnd && entryEnd >= hourStart;
      }
      return entryStart < hourEnd && entryEnd > hourStart;
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
    entriesInHour = entriesInHour.filter((entry) => entry.userId === user.id);
  }

  // Calculate total hours for this hour bucket
  return entriesInHour.reduce((acc, entry) => {
    try {
      const entryStartDate = new Date(entry.startTime);
      if (Number.isNaN(entryStartDate.getTime())) return acc;

      const entryStart = entryStartDate.getTime();
      const entryEnd = entry.endTime
        ? (() => {
            const endDate = new Date(entry.endTime);
            return Number.isNaN(endDate.getTime())
              ? currentTime
              : endDate.getTime();
          })()
        : currentTime;

      const overlapStart = Math.max(entryStart, hourStart);
      const overlapEnd = Math.min(entryEnd, hourEnd);
      const overlapHours = Math.max(0, (overlapEnd - overlapStart) / 3600000);

      return acc + overlapHours;
    } catch {
      return acc;
    }
  }, 0);
}
