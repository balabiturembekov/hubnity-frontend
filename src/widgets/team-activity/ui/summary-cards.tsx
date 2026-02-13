import { format } from "date-fns";
import { Calendar, Clock, DollarSign, Users } from "lucide-react";
import { periodsLabels } from "@/entities/team-activity";
import { useUser } from "@/entities/user";
import { useTeamActivityStore } from "@/features/team-activity";
import { useTimeEntry } from "@/features/time-entry";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
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
      className={`grid gap-4 ${isAdmin ? "md:grid-cols-4" : "md:grid-cols-3"}`}
    >
      {isAdmin && (
        <Card className="transition-shadow hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalMembers}</div>
            <p className="text-xs text-muted-foreground">
              {avgHoursPerMember > 0
                ? `${avgHoursPerMember.toFixed(1)}h avg`
                : "No activity"}
            </p>
          </CardContent>
        </Card>
      )}
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{teamActivityTotalHours}</div>
          <p className="text-xs text-muted-foreground">
            {isAdmin && totalMembers > 0
              ? `${(timeActiveTotalHours / totalMembers).toFixed(1)}h per member`
              : "Hours tracked"}
          </p>
        </CardContent>
      </Card>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalEarned?.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {isAdmin && totalMembers > 0
              ? `$${avgEarnedPerMember.toFixed(2)} per member`
              : "Total earnings"}
          </p>
        </CardContent>
      </Card>
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Period</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-sm font-medium">
            {!Number.isNaN(new Date(timeActivePeriod.startDate).getTime()) &&
            !Number.isNaN(new Date(timeActivePeriod.endDate).getTime())
              ? `${format(new Date(timeActivePeriod.startDate), "MMM dd")} - ${format(new Date(timeActivePeriod.endDate), "MMM dd, yyyy")}`
              : "Invalid date range"}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {periodsLabels[period]}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
