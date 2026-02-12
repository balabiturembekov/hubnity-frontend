import { useMemo } from "react";
import { useGetTimeEntriesQuery } from "@/entities/time-entry";
import { useUserStore } from "@/entities/user";

const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
};

export const useTimeEntry = () => {
  const { user } = useUserStore();
  const { data: timeEntries, isPending } = useGetTimeEntriesQuery();

  const stats = useMemo(() => {
    if (!timeEntries?.length || !user) {
      return {
        entriesCount: 0,
        todayEntries: 0,
        todayTime: "0:00:00",
        weekTime: "0:00:00",
        monthTime: "0:00:00",
        todayHours: "0.00",
        totalHours: "0.00",
      };
    }

    // Filter entries for current user
    const userEntries = timeEntries.filter((entry) => entry.userId === user.id);

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

    const todayEntries = userEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfToday,
    );
    const weekEntries = userEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfWeek,
    );
    const monthEntries = userEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfMonth,
    );

    const todayDuration = todayEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );
    const weekDuration = weekEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );
    const monthDuration = monthEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );
    const totalDuration = userEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );

    const todayHours = (todayDuration / 3600).toFixed(2);
    const totalHours = (totalDuration / 3600).toFixed(2);

    return {
      entriesCount: todayEntries.length,
      todayEntries: todayEntries.length,
      todayTime: formatDuration(todayDuration),
      weekTime: formatDuration(weekDuration),
      monthTime: formatDuration(monthDuration),
      todayHours,
      totalHours,
    };
  }, [timeEntries, user]);

  return {
    ...stats,
    isPending,
  };
};
