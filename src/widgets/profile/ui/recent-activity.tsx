import { Clock } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export const RecentActivity = () => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle>Recent Time Entries</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {/* COMMENT */}
            {/* {myEntries.filter((e) => e.status === "stopped").length} */}1
          </Badge>
        </div>
        <CardDescription>Your latest tracked time entries</CardDescription>
      </CardHeader>
      <CardContent>
        {/* {myEntries.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">
              No time entries yet. Start time-entry your time to see entries here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {myEntries
              .filter((e) => e.status === "stopped")
              .slice(0, 5)
              .map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-muted/50 hover:shadow-sm"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {entry.projectName && (
                        <Badge variant="outline" className="text-xs">
                          {entry.projectName}
                        </Badge>
                      )}
                      {!entry.projectName && (
                        <Badge variant="secondary" className="text-xs">
                          No project
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {(() => {
                        // Safely parse dates
                        let startDate: Date | null = null;
                        let endDate: Date | null = null;
                        try {
                          const start = new Date(entry.startTime);
                          if (!Number.isNaN(start.getTime())) {
                            startDate = start;
                          }
                          if (entry.endTime) {
                            const end = new Date(entry.endTime);
                            if (!Number.isNaN(end.getTime())) {
                              endDate = end;
                            }
                          }
                        } catch {
                          // Invalid dates - will show fallback
                        }

                        if (!startDate) {
                          return "Invalid date";
                        }

                        return (
                          <>
                            {format(startDate, "MMM dd, yyyy HH:mm")}
                            {endDate && <> - {format(endDate, "HH:mm")}</>}
                          </>
                        );
                      })()}
                    </p>
                    {entry.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {entry.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-semibold">
                      {(() => {
                        const duration = entry.duration;
                        if (
                          duration === null ||
                          duration === undefined ||
                          !Number.isFinite(duration) ||
                          Number.isNaN(duration) ||
                          duration < 0
                        ) {
                          return formatDurationFull(0);
                        }
                        return formatDurationFull(duration / 3600);
                      })()}
                    </p>
                    <p className="text-xs text-muted-foreground">duration</p>
                  </div>
                </div>
              ))}
          </div>
        )} */}
      </CardContent>
    </Card>
  );
};
