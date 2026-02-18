"use client";

import { format } from "date-fns";
import { Calendar, Clock, Users } from "lucide-react";
import { StatsCard } from "@/entities/stats";
import { periodsLabels } from "@/entities/team-activity";
import { useUser } from "@/entities/user";
import { useTeamActivityStore } from "@/features/team-activity";
import { useTimeEntry } from "@/features/time-entry";
import { SummaryCardsSkeleton } from "./summary-cards-skeleton";

export const SummaryCards = () => {
  const { isAdmin } = useUser();
  const {
    isPending,
    totalMembers,
    totalEarned,
    avgHoursPerMember,
    avgEarnedPerMember,
    timeActiveTotalHours,
    timeActivePeriod,
    teamActivityTotalHours,
  } = useTimeEntry();
  const { period } = useTeamActivityStore();

  if (isPending) {
    return <SummaryCardsSkeleton />;
  }

  return (
    <div
      className={`grid gap-4 ${isAdmin ? "sm:grid-cols-2 xl:grid-cols-4" : "md:grid-cols-3"}`}
    >
      {isAdmin && (
        <StatsCard
          title="Total Members"
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
        title="Total Hours"
        icon={Clock}
        stat={teamActivityTotalHours ?? "0"}
        description={
          <p className="text-xs text-muted-foreground">
            {isAdmin && totalMembers > 0
              ? `${(timeActiveTotalHours / totalMembers).toFixed(1)}h per member`
              : "Hours tracked"}
          </p>
        }
        color="blue"
      />
      <StatsCard
        title="Total Earned"
        icon={Users}
        stat={`$${totalEarned?.toFixed(2)}`}
        description={
          <p className="text-xs text-muted-foreground">
            {isAdmin && totalMembers > 0
              ? `$${avgEarnedPerMember.toFixed(2)} per member`
              : "Total earnings"}
          </p>
        }
        color="red"
      />
      <StatsCard
        title="Period"
        icon={Calendar}
        statsClassName="text-2xl"
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
    </div>
  );
};
