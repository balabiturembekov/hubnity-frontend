import { Clock } from "lucide-react";
import {
  getEntryDate,
  getEntryDuration,
} from "@/entities/time-entry/lib/time-entry.lib";
import { useTimeEntry } from "@/features/time-entry";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export const RecentActivity = () => {
  const { myEntries } = useTimeEntry();

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-primary" />
          <CardTitle>Recent Time Entries</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {myEntries.filter((e) => e.status === "STOPPED").length}
          </Badge>
        </div>
        <CardDescription>Your latest tracked time entries</CardDescription>
      </CardHeader>
      <CardContent>
        {myEntries.length === 0 ? (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-sm text-muted-foreground">
              No time entries yet. Start time-entry your time to see entries
              here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {myEntries
              .filter((e) => e.status === "STOPPED")
              .slice(0, 5)
              .map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-muted/50 hover:shadow-sm"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {entry.project?.name && (
                        <Badge variant="outline" className="text-xs">
                          {entry.project.name}
                        </Badge>
                      )}
                      {!entry.project?.name && (
                        <Badge variant="secondary" className="text-xs">
                          No project
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">
                      {getEntryDate(entry)}
                    </p>
                    {entry.description && (
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {entry.description}
                      </p>
                    )}
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-sm font-semibold">
                      {getEntryDuration(entry)}
                    </p>
                    <p className="text-xs text-muted-foreground">duration</p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
