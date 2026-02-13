import { useMemo } from "react";
import {
  useGetActiveTimeEntriesQuery,
  useGetTimeEntriesQuery,
} from "@/entities/time-entry";
import { useUserStore } from "@/entities/user";
import { formatDurationFull } from "@/shared/lib/utils";

export const useTimeEntry = () => {
  const { user } = useUserStore();
  const { data: timeEntries, isPending } = useGetTimeEntriesQuery();
  const { data: activeTimeEntries } = useGetActiveTimeEntriesQuery();

  const stats = useMemo(() => {
    if (!timeEntries?.length || !user) {
      return {
        entriesCount: 0,
        todayEntries: 0,
        todayTime: "00:00:00",
        weekTime: "00:00:00",
        monthTime: "00:00:00",
        todayHours: 0,
        totalHours: 0,

        myTotalTime: "00:00:00",
        myTodayTime: "00:00:00",
        myWeekTime: "00:00:00",
        myMonthTime: "00:00:00",
        myActiveEntries: 0,
        myTotalEntries: 0,
        myEntries: [],
        totalTime: 0,
        activeTimeEntries: 0,
      };
    }

    const myEntries = timeEntries.filter((entry) => entry.userId === user.id);
    const myActiveEntries = myEntries.filter(
      (entry) => entry.status === "RUNNING",
    );

    const now = new Date();
    const startOfToday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
    );
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const todayEntries = timeEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfToday,
    );
    const myTodayEntries = myEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfToday,
    );

    const weekEntries = timeEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfWeek,
    );
    const myWeekEntries = myEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfWeek,
    );

    const monthEntries = timeEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfMonth,
    );
    const myMonthEntries = myEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfMonth,
    );

    const todayDuration = todayEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );
    const myTodayDuration = myTodayEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );

    const weekDuration = weekEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );
    const myWeekDuration = myWeekEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );

    const monthDuration = monthEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );
    const myMonthDuration = myMonthEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );

    const totalDuration = timeEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );
    const myTotalDuration = myEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );

    return {
      entriesCount: todayEntries.length,
      todayEntries: todayEntries.length,
      todayTime: formatDurationFull(todayDuration),
      weekTime: formatDurationFull(weekDuration),
      monthTime: formatDurationFull(monthDuration),
      todayHours: (todayDuration / 3600).toFixed(2),
      totalHours: (totalDuration / 3600).toFixed(2),

      myTotalTime: formatDurationFull(myTotalDuration),
      myTodayTime: formatDurationFull(myTodayDuration),
      myWeekTime: formatDurationFull(myWeekDuration),
      myMonthTime: formatDurationFull(myMonthDuration),
      myActiveEntries: myActiveEntries.length,
      myTotalEntries: myEntries.length,
      totalTime: formatDurationFull(totalDuration),
      myEntries,
    };
  }, [timeEntries, user]);

  return {
    ...stats,
    activeTimeEntries,
    isPending,
  };
};
