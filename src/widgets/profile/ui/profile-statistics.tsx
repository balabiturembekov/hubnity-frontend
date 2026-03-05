import { Activity, Clock } from "lucide-react";
import { useMyTimeEntries } from "@/entities/time-entry";
import { PROFILE_STATISTICS, type ProfileStatisticId } from "@/entities/user";
import { cn } from "@/shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ProfileTimeStatisticsSkeleton } from "@/widgets/skeleton";

export const ProfileStatistics = () => {
  const {
    myTotalStats,
    myTodayStats,
    myThisWeekStats,
    myThisMonthStats,
    myLastMonthStats,
    myThisYearStats,
    isMyStatsPending,
    isMyRecentTimeEntriesPending,
  } = useMyTimeEntries();

  const statsMap: Record<
    ProfileStatisticId,
    { totalHours: number } | undefined
  > = {
    today: myTodayStats,
    "this-week": myThisWeekStats,
    "this-month": myThisMonthStats,
    "last-month": myLastMonthStats,
    "this-year": myThisYearStats,
  };

  if (isMyStatsPending || isMyRecentTimeEntriesPending) {
    return <ProfileTimeStatisticsSkeleton />;
  }

  return (
    <Card className="transition-shadow hover:shadow-md h-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-primary" />
          <CardTitle>Time Statistics</CardTitle>
        </div>
        <CardDescription>Your tracked time overview</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full gap-8">
        <div className="rounded-xl bg-linear-to-br from-primary/10 to-primary/5 p-5 border border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-primary/10 rounded-md">
                <Clock className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-foreground">
                Total Tracked Time
              </span>
            </div>
          </div>
          <div className="flex items-end justify-between relative z-10 gap-4">
            <p className="text-3xl font-bold tracking-tight text-primary">
              {`${myTotalStats?.totalHours ?? 0}h`}
            </p>
            <div className="flex flex-col items-end">
              <span className="text-sm font-semibold text-foreground">
                {myTotalStats?.entriesCount ?? 0}
              </span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
                Entries
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-between flex-1 pt-2">
          {PROFILE_STATISTICS.map(({ icon: Icon, ...stat }) => {
            const hours = statsMap[stat.id]?.totalHours ?? 0;
            const formattedHours = stat.formatHours(hours);

            return (
              <div
                key={stat.id}
                className="group flex justify-between items-center p-3 rounded-xl hover:bg-muted/40 border border-transparent hover:border-border transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-lg group-hover:text-white transition-colors",
                      stat.colorClasses,
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-base font-semibold text-foreground tracking-tight">
                      {stat.label}
                    </span>
                    <span className="text-xs text-muted-foreground font-medium">
                      {stat.getDateValue()}
                    </span>
                  </div>
                </div>
                <span className="text-lg font-bold text-foreground">
                  {formattedHours}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
