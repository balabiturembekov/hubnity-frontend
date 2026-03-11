"use client";

import { format } from "date-fns";
import { Calendar, Clock, Users } from "lucide-react";
import { useOrganizationRole } from "@/entities/organization";
import { StatsCard } from "@/entities/stats";
import { periodsLabels } from "@/entities/team-activity";
import { useTimeEntries } from "@/entities/time-entry";
import { useTeamActivityStore } from "@/features/team-activity";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const SummaryCards = () => {
  const { isAdmin } = useOrganizationRole();
  const {
    isPending,
    totalMembers,
    formattedTotalEarned,
    avgHoursPerMember,
    avgEarnedPerMember,
    teamActivityTotalHours,
    timeActivePeriod,
  } = useTimeEntries();
  const { period } = useTeamActivityStore();

  if (isPending) {
    return <StatsCardsSkeleton count={isAdmin ? 4 : 3} />;
  }

  return (
    <div
      className={`grid gap-4 ${isAdmin ? "sm:grid-cols-2 xl:grid-cols-4" : "xl:grid-cols-3"}`}
    >
      {isAdmin && (
        <StatsCard
          title="Members"
          icon={Users}
          stat={totalMembers}
          description={
            <p className="text-xs text-muted-foreground">
              {avgHoursPerMember > 0
                ? `${avgHoursPerMember.toFixed(1)}h avg`
                : "No activity"}
            </p>
          }
          color="green"
        />
      )}
      <StatsCard
        title="Period"
        icon={Calendar}
        statsClassName="text-xl"
        stat={
          !Number.isNaN(new Date(timeActivePeriod.startDate).getTime()) &&
          !Number.isNaN(new Date(timeActivePeriod.endDate).getTime())
            ? `${format(new Date(timeActivePeriod.startDate), "MMM dd")} - ${format(new Date(timeActivePeriod.endDate), "MMM dd, yyyy")}`
            : "Invalid date range"
        }
        description={
          <p className="text-xs text-muted-foreground mt-1">
            {periodsLabels[period]}
          </p>
        }
        color="yellow"
      />
      <StatsCard
        title="Total Earned"
        icon={Users}
        stat={formattedTotalEarned}
        description={
          <p className="text-xs text-muted-foreground">
            {isAdmin && totalMembers > 0
              ? `$${avgEarnedPerMember.toFixed(2)} per member`
              : "Total earnings"}
          </p>
        }
        statsClassName="text-xl"
        color="red"
      />
      <StatsCard
        title="Total Hours"
        icon={Clock}
        stat={`${teamActivityTotalHours.toFixed(2)}h`}
        statsClassName="text-2xl"
        description={
          <p className="text-xs text-muted-foreground">
            {isAdmin && totalMembers > 0
              ? `${(teamActivityTotalHours / totalMembers).toFixed(2)}h per member`
              : "Hours tracked"}
          </p>
        }
        color="blue"
      />
    </div>
  );
};
