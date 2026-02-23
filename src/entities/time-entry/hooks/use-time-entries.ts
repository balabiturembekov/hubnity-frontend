import { useMemo } from "react";
import { useGetTeamActivityQuery } from "@/entities/team-activity";
import {
  useGetActiveTimeEntriesQuery,
  useGetTimeEntriesQuery,
} from "@/entities/time-entry";
import { useTeamActivityStore } from "@/features/team-activity/model/team-activity.store";
import { formatDurationFull } from "@/shared/lib/utils";

export const useTimeEntries = () => {
  const { period, userId, projectId } = useTeamActivityStore();

  const { data: timeEntries, isPending: isPendingTimeEntries } =
    useGetTimeEntriesQuery();
  const { data: activeTimeEntries, isPending: isPendingActiveTimeEntries } =
    useGetActiveTimeEntriesQuery();
  const { data: teamActivity, isPending: isPendingTeamActivity } =
    useGetTeamActivityQuery(
      period,
      userId === "all" ? undefined : userId,
      projectId === "all" ? undefined : projectId,
    );

  const stats = useMemo(() => {
    const safeTimeEntries = timeEntries ?? [];

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

    const todayEntries = safeTimeEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfToday,
    );

    const weekEntries = safeTimeEntries.filter(
      (entry) => new Date(entry.startTime) >= startOfWeek,
    );

    const monthEntries = safeTimeEntries.filter(
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

    const totalDuration = safeTimeEntries.reduce(
      (sum, entry) => sum + entry.duration,
      0,
    );

    const totalMembers = teamActivity?.totalMembers ?? 0;
    const totalEarned = teamActivity?.totalEarned ?? 0;
    const teamMembers = teamActivity?.members ?? [];
    const teamActivityTotalHours = teamMembers.reduce(
      (sum, member) => sum + member.totalHours,
      0,
    );

    const avgHoursPerMember =
      totalMembers > 0 ? teamActivityTotalHours / totalMembers : 0;
    const avgEarnedPerMember =
      totalMembers > 0 ? totalEarned / totalMembers : 0;

    const formattedTotalEarned = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(totalEarned);

    return {
      entriesCount: todayEntries.length,
      todayEntries: todayEntries.length,
      todayTime: formatDurationFull(todayDuration),
      weekTime: formatDurationFull(weekDuration),
      monthTime: formatDurationFull(monthDuration),
      todayHours: (todayDuration / 3600).toFixed(2),
      totalHours: (totalDuration / 3600).toFixed(2),

      totalMembers,
      formattedTotalEarned,
      avgHoursPerMember,
      avgEarnedPerMember,
      timeActivePeriod: teamActivity?.period ?? {
        startDate: new Date(),
        endDate: new Date(),
      },
      teamActivityTotalHours,
    };
  }, [timeEntries, teamActivity]);

  return {
    ...stats,
    activeTimeEntries,
    isPending:
      isPendingTimeEntries ||
      isPendingTeamActivity ||
      isPendingActiveTimeEntries,
  };
};
