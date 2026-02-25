import {
  getEntryDate,
  getEntryDuration,
  type TimeEntryEntity,
} from "@/entities/time-entry";
import { Badge } from "@/shared/ui/badge";

interface RecentActivityCardProps {
  entry: TimeEntryEntity;
}

export const RecentActivityCard = ({ entry }: RecentActivityCardProps) => {
  return (
    <div
      key={entry.id}
      className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md hover:border-border/80 transition-all duration-200 gap-4"
    >
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          {entry.project?.name ? (
            <Badge
              variant="outline"
              className="text-xs transition-colors"
              style={{
                borderColor: entry.project.color,
                color: entry.project.color,
              }}
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
  );
};
