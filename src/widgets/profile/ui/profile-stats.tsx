"use client";

import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { Calendar, Clock, FileText, TrendingUp } from "lucide-react";
import { StatsCard } from "@/entities/stats";
import { useMyTimeEntries } from "@/entities/time-entry";
import { formatDurationFull } from "@/shared/lib/utils";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const ProfileStats = () => {
  const {
    myTotalStats,
    myTodayStats,
    myLast7daysStats,
    myThisMonthStats,
    isMyStatsPending,
  } = useMyTimeEntries();

  if (isMyStatsPending) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="Today"
        icon={Calendar}
        stat={formatDurationFull((myTodayStats?.totalHours ?? 0) * 3600)}
        statsClassName="text-2xl"
        description={
          <p className="text-xs text-muted-foreground">
            {format(new Date(), "MMM d")}
          </p>
        }
        color="blue"
      />
      <StatsCard
        title="This Week"
        icon={TrendingUp}
        stat={`${myLast7daysStats?.totalHours ?? 0}h`}
        statsClassName="text-2xl"
        description={
          <p className="text-xs text-muted-foreground">
            {format(startOfWeek(new Date(), { weekStartsOn: 1 }), "MMM d")} -{" "}
            {format(endOfWeek(new Date(), { weekStartsOn: 1 }), "MMM d")}
          </p>
        }
        color="red"
      />
      <StatsCard
        title="This Month"
        icon={FileText}
        stat={`${myThisMonthStats?.totalHours ?? 0}h`}
        statsClassName="text-2xl"
        description={
          <p className="text-xs text-muted-foreground">
            {format(startOfMonth(new Date()), "MMM d")} -{" "}
            {format(endOfMonth(new Date()), "MMM d")}
          </p>
        }
        color="yellow"
      />
      <StatsCard
        title="Total Hours"
        icon={Clock}
        stat={`${myTotalStats?.totalHours ?? 0}h`}
        statsClassName="text-2xl"
        description={
          <p className="text-xs text-muted-foreground">
            {myTotalStats?.entriesCount ?? 0} entries tracked
          </p>
        }
        color="green"
      />
    </div>
  );
};
