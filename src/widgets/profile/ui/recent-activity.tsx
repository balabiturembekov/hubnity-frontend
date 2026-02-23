import { Clock } from "lucide-react";
import { useMyTimeEntries } from "@/entities/time-entry";
import {
  getEntryDate,
  getEntryDuration,
} from "@/entities/time-entry/lib/time-entry.lib";
import { Badge } from "@/shared/ui/badge";
import { DashboardSectionHeader } from "@/widgets/header";
import { ListItemsSkeleton } from "@/widgets/skeleton";

export const RecentActivity = () => {
  const { myEntries, isMyRecentTimeEntriesPending } = useMyTimeEntries();

  if (isMyRecentTimeEntriesPending) {
    return <ListItemsSkeleton />;
  }

  return (
    <section className="flex flex-col gap-4">
      <DashboardSectionHeader
        title="Recent Activity"
        description="Your latest tracked time records"
        icon={Clock}
      >
        <Badge variant="secondary" className="ml-2">
          {myEntries.filter((e) => e.status === "STOPPED").length}
        </Badge>
      </DashboardSectionHeader>
      {myEntries.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">
            No time entries yet. Start time-entry your time to see entries here.
          </p>
        </div>
      ) : (
        <div className="space-y-2 pt-2">
          {myEntries
            .filter((e) => e.status === "STOPPED")
            .slice(0, 5)
            .map((entry) => (
              <div
                key={entry.id}
                className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 gap-4"
              >
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    {entry.project?.name ? (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                      >
                        {entry.project.name}
                      </Badge>
                    ) : (
                      <Badge
                        variant="outline"
                        className="text-xs text-muted-foreground border-dashed"
                      >
                        No project
                      </Badge>
                    )}
                    <span className="text-xs font-medium text-muted-foreground">
                      {getEntryDate(entry)}
                    </span>
                  </div>

                  {entry.description ? (
                    <p className="text-sm font-medium text-foreground line-clamp-1">
                      {entry.description}
                    </p>
                  ) : (
                    <p className="text-sm font-medium text-muted-foreground italic">
                      No description provided
                    </p>
                  )}
                </div>

                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0">
                  <span className="text-xs text-muted-foreground sm:hidden tracking-wide uppercase font-semibold">
                    Duration
                  </span>
                  <div className="flex flex-col items-end">
                    <p className="text-lg font-bold text-primary group-hover:text-primary transition-colors">
                      {getEntryDuration(entry)}
                    </p>
                    <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold hidden sm:block">
                      Tracked
                    </span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </section>
  );
};
