import { Clock } from "lucide-react";
import { useMyTimeEntries } from "@/entities/time-entry";
import { Badge } from "@/shared/ui/badge";
import { DashboardSectionHeader } from "@/widgets/header";
import { ListItemsSkeleton } from "@/widgets/skeleton";
import { RecentActivityCard } from "./recent-activity-card";

export const RecentActivity = () => {
  const { myEntries, isMyRecentTimeEntriesPending } = useMyTimeEntries();

  if (isMyRecentTimeEntriesPending) {
    return <ListItemsSkeleton />;
  }

  const stoppedEntries = myEntries.filter((e) => e.status === "STOPPED");
  const displayedCount = Math.min(stoppedEntries.length, 5);

  return (
    <section className="space-y-4">
      <DashboardSectionHeader
        title="Recent Activity"
        description="Your latest tracked time records"
        icon={Clock}
      >
        {stoppedEntries.length > 0 && (
          <Badge
            variant="secondary"
            className="font-normal text-muted-foreground sm:ml-2 shrink-0"
          >
            <span className="hidden sm:inline">Showing last</span>
            <span className="sm:hidden">Last</span>
            {displayedCount} of {stoppedEntries.length}
          </Badge>
        )}
      </DashboardSectionHeader>
      {stoppedEntries.length === 0 ? (
        <div className="text-center py-12">
          <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <p className="text-sm text-muted-foreground">
            No time entries yet. Start tracking your time to see entries here.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {stoppedEntries.slice(0, 5).map((entry) => (
            <RecentActivityCard key={entry.id} entry={entry} />
          ))}
        </ul>
      )}
    </section>
  );
};
