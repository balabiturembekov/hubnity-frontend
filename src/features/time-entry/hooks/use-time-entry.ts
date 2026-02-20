import { useMemo } from "react";
import { useGetTeamActivityQuery } from "@/entities/team-activity";
import {
  useGetActiveTimeEntriesQuery,
  useGetTimeEntriesQuery,
} from "@/entities/time-entry";
import { useCurrentUser, useGetEmployeesQuery } from "@/entities/user";
import { useTeamActivityStore } from "@/features/team-activity/model/team-activity.store";
import { formatDurationFull } from "@/shared/lib/utils";

export const useTimeEntry = () => {
  const { data: user } = useCurrentUser();
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
  const { data: employees, isPending: isPendingEmployees } =
    useGetEmployeesQuery();

  const stats = useMemo(() => {
    if (!timeEntries?.length || !user || !teamActivity || !employees?.length) {
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

        totalMembers: 0,
        totalEarned: 0,
        avgHoursPerMember: 0,
        avgEarnedPerMember: 0,
        timeActiveTotalHours: 0,
        timeActivePeriod: {
          startDate: new Date("2026-02-13T06:36:06.309Z"),
          endDate: new Date("2026-02-13T06:36:06.309Z"),
        },
        teamActiveTotalHours: 0,
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

    const totalMembers = teamActivity.totalMembers;
    const totalEarned = teamActivity.totalEarned;
    const timeActiveTotalHours = teamActivity.members.reduce(
      (sum, member) => sum + member.totalHours,
      0,
    );
    const teamActivityTotalHours = teamActivity.members.reduce(
      (sum, member) => sum + member.totalHours,
      0,
    );

    const avgHoursPerMember = timeActiveTotalHours / totalMembers;
    const avgEarnedPerMember = totalEarned / totalMembers;

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

      totalMembers,
      totalEarned,
      avgHoursPerMember,
      avgEarnedPerMember,
      timeActiveTotalHours,
      timeActivePeriod: teamActivity.period,
      teamActivityTotalHours: formatDurationFull(teamActivityTotalHours * 3600),
    };
  }, [timeEntries, teamActivity, user, employees]);

  return {
    ...stats,
    activeTimeEntries,
    isPending:
      isPendingTimeEntries ||
      isPendingTeamActivity ||
      isPendingActiveTimeEntries ||
      isPendingEmployees,
  };
};
