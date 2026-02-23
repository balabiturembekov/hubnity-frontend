"use client";

import {
  Activity,
  CalendarDays,
  Clock,
  Timer,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { StatsCard } from "@/entities/stats";
import { useUserStats } from "@/entities/user/hooks/use-user-stats";
import { formatDurationFull } from "@/shared/lib/utils";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

interface EmployeeDetailsTopStatsProps {
  userId: string;
}

export const EmployeeDetailsTopStats = ({
  userId,
}: EmployeeDetailsTopStatsProps) => {
  const { todayStats, thisWeekStats, thisMonthStats, isPending } =
    useUserStats(userId);

  if (isPending) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      <StatsCard
        title="Today"
        icon={Timer}
        stat={formatDurationFull((todayStats?.totalHours ?? 0) * 3600)}
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
      <StatsCard
        title="This Week"
        icon={Clock}
        stat={`${thisWeekStats?.totalHours ?? 0}h`}
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
        title="This Month"
        icon={CalendarDays}
        stat={`${thisMonthStats?.totalHours ?? 0}h`}
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
    </div>
  );
};
