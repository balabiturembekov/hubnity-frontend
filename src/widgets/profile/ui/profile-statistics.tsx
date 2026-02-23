import {
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useMyTimeEntries } from "@/entities/time-entry";
import { formatDurationFull } from "@/shared/lib/utils";
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
    myActiveEntries,
    myTotalStats,
    myTodayStats,
    myLast7daysStats,
    myThisMonthStats,
    isMyStatsPending,
    isMyRecentTimeEntriesPending,
  } = useMyTimeEntries();

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
      <CardContent className="space-y-6">
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

        <div className="space-y-4 pt-2">
          <div className="group flex justify-between items-center p-3 rounded-xl hover:bg-muted/40 border border-transparent hover:border-border transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-foreground tracking-tight">
                  Today
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {format(new Date(), "MMM d")}
                </span>
              </div>
            </div>
            <span className="text-lg font-bold text-foreground">
              {formatDurationFull((myTodayStats?.totalHours ?? 0) * 3600)}
            </span>
          </div>

          <div className="group flex justify-between items-center p-3 rounded-xl hover:bg-muted/40 border border-transparent hover:border-border transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-600 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-foreground tracking-tight">
                  This Week
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {format(
                    startOfWeek(new Date(), { weekStartsOn: 1 }),
                    "MMM d",
                  )}{" "}
                  -{" "}
                  {format(endOfWeek(new Date(), { weekStartsOn: 1 }), "MMM d")}
                </span>
              </div>
            </div>
            <span className="text-lg font-bold text-foreground">
              {`${myLast7daysStats?.totalHours ?? 0}h`}
            </span>
          </div>

          <div className="group flex justify-between items-center p-3 rounded-xl hover:bg-muted/40 border border-transparent hover:border-border transition-all duration-200">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-500/10 text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-semibold text-foreground tracking-tight">
                  This Month
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {format(startOfMonth(new Date()), "MMM d")} -{" "}
                  {format(endOfMonth(new Date()), "MMM d")}
                </span>
              </div>
            </div>
            <span className="text-lg font-bold text-foreground">
              {`${myThisMonthStats?.totalHours ?? 0}h`}
            </span>
          </div>
        </div>

        {myActiveEntries.length > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-700">
                  {myActiveEntries.length} active{" "}
                  {myActiveEntries.length === 1 ? "timer" : "timers"}
                </p>
                <p className="text-xs text-green-600">
                  You have running time entries
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
