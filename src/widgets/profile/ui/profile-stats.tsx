import { Calendar, Clock, FileText, TrendingUp } from "lucide-react";
import { formatDurationFull } from "@/shared/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export const ProfileStats = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card className="transition-shadow hover:shadow-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {/* COMMENT */}
            {/* {formatDurationFull(totalHours)} */}
            {formatDurationFull(1)}
          </div>
          <p className="text-xs text-muted-foreground">
            {/* COMMENT */}
            {/* {totalEntries} entries tracked */}1 entries tracked
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
            {/* COMMENT */}
            {/* {formatDurationFull(todayHours)} */}
            {formatDurationFull(1)}
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
            {/* COMMENT */}
            {/* {formatDurationFull(weekHours)} */}
            {formatDurationFull(1)}
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
            {/* {formatDurationFull(monthHours)} */}
            {formatDurationFull(1)}
          </div>
          <p className="text-xs text-muted-foreground">Last 30 days</p>
        </CardContent>
      </Card>
    </div>
  );
};
