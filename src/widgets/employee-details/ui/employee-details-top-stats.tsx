"use client";

import {
  Activity,
  CalendarDays,
  Clock,
  Timer,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import { StatsCard } from "@/entities/stats";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

interface EmployeeDetailsTopStatsProps {
  userId: string;
}

export const EmployeeDetailsTopStats = ({
  userId,
}: EmployeeDetailsTopStatsProps) => {
  const { data: thisWeekStats, isPending: isThisWeekStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId,
      period: "7days",
    });
  const { data: thisMonthStats, isPending: isThisMonthStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId,
      period: "this_month",
    });
  const { data: totalStats, isPending: isTotalStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId,
    });

  const isPending =
    isThisWeekStatsPending || isThisMonthStatsPending || isTotalStatsPending;

  if (!thisWeekStats || !thisMonthStats || !totalStats || isPending) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatsCard
        title="Hours this week"
        icon={Clock}
        stat={thisWeekStats.totalHours}
        description={
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-green-500">
              <TrendingUp size={16} />
              <span>+5%</span>
            </div>
            <div>vs last 30 days</div>
          </div>
        }
        color="green"
      />
      <StatsCard
        title="Hours This Month"
        icon={CalendarDays}
        stat={thisMonthStats.totalHours}
        description={
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-red-500">
              <TrendingDown size={16} />
              <span>-3%</span>
            </div>
            <div>vs last 30 days</div>
          </div>
        }
        color="blue"
      />
      <StatsCard
        title="Activity Score"
        icon={Activity}
        stat={123}
        description={
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-green-500">
              <TrendingUp size={16} />
              <span>+7%</span>
            </div>
            <div>vs last 30 days</div>
          </div>
        }
        color="red"
      />
      <StatsCard
        title="Total Sessions"
        icon={Timer}
        stat={totalStats.entriesCount}
        description={
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-1 text-red-500">
              <TrendingDown size={16} />
              <span>-8%</span>
            </div>
            <div>vs last 30 days</div>
          </div>
        }
        color="yellow"
      />
    </div>
  );
};
