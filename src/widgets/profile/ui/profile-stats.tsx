"use client";

import { Calendar, Clock, FileText, TrendingUp } from "lucide-react";
import { useGetDashboardAnalyticsQuery } from "@/entities/dashboard-analytics";
import { useUserStore } from "@/entities/user";
import { formatDurationFull } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { StatsCardsSkeleton } from "@/widgets/skeleton";

export const ProfileStats = () => {
  const { user } = useUserStore();
  const { data: totalStats, isPlaceholderData: isTotalStatsPending } =
    useGetDashboardAnalyticsQuery({
      userId: user?.id,
    });
  const { data: todayStats, isPending: isTodayStatsPending } =
    useGetDashboardAnalyticsQuery({
      period: "today",
    });
  const { data: last7daysStats, isPending: isLast7daysPending } =
    useGetDashboardAnalyticsQuery({
      period: "7days",
    });
  const { data: thisMonthStats, isPending: isThisMonthPending } =
    useGetDashboardAnalyticsQuery({
      period: "this_month",
    });

  if (!todayStats || !last7daysStats || !thisMonthStats || !totalStats) {
    return null;
  }

  const isPending =
    isTodayStatsPending ||
    isLast7daysPending ||
    isThisMonthPending ||
    isTotalStatsPending;

  if (isPending) {
    return <StatsCardsSkeleton />;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatDurationFull(totalStats.totalHours * 3600)}
            {/* TODO: Change to totalStats.totalSeconds after adding on backend  */}
          </div>
          <p className="text-xs text-muted-foreground">
            {totalStats.entriesCount} entries tracked
          </p>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatDurationFull(todayStats.totalHours * 3600)}
            {/* TODO: Change to todayStats.totalSeconds after adding on backend  */}
          </div>
          <p className="text-xs text-muted-foreground">Hours tracked today</p>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatDurationFull(last7daysStats.totalHours * 3600)}
            {/* TODO: Change to last7daysStats.totalSeconds after adding on backend  */}
          </div>
          <p className="text-xs text-muted-foreground">Last 7 days</p>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatDurationFull(thisMonthStats.totalHours * 3600)}
            {/* TODO: Change to thisMonthStats.totalSeconds after adding on backend  */}
          </div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>
    </div>
  );
};
