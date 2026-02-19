import {
  Activity,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useTimeEntry } from "@/features/time-entry";
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
    myTotalEntries,
    myTotalTime,
    myTodayTime,
    myWeekTime,
    myMonthTime,
    myActiveEntries,
    isPending,
  } = useTimeEntry();

  if (isPending) {
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
        <div className="rounded-lg bg-primary/5 p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Total Hours</span>
            </div>
            <p className="text-2xl font-bold">{myTotalTime}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Total Entries</span>
            <span className="text-sm font-semibold">{myTotalEntries}</span>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t">
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Today</span>
            </div>
            <span className="text-sm font-semibold">{myTodayTime}</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">This Week</span>
            </div>
            <span className="text-sm font-semibold">{myWeekTime}</span>
          </div>
          <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">This Month</span>
            </div>
            <span className="text-sm font-semibold">{myMonthTime}</span>
          </div>
        </div>

        {myActiveEntries > 0 && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-700">
                  {myActiveEntries} active{" "}
                  {myActiveEntries === 1 ? "timer" : "timers"}
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
