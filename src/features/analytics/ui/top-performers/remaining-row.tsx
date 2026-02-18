"use client";

import { getInitials } from "@/features/analytics/lib/aggregate-performers";
import type { Performer } from "@/features/analytics/model/types";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";

interface RemainingRowProps {
  performer: Performer;
  rank: number;
  maxHours: number;
}

export function RemainingRow({ performer, rank, maxHours }: RemainingRowProps) {
  const percentage = Math.round((performer.hours / maxHours) * 100);

  return (
    <div className="flex flex-col min-[500px]:flex-row items-center gap-4 rounded-xl border border-border bg-card p-3.5 transition-colors hover:bg-accent/50">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted text-xs font-semibold text-muted-foreground">
        {rank}
      </div>

      <div className="flex items-center gap-2 w-full">
        <Avatar className="h-9 w-9 shrink-0">
          <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
            {getInitials(performer.userName)}
          </AvatarFallback>
        </Avatar>

        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <span className="truncate text-sm font-medium text-foreground">
              {performer.userName}
            </span>
            <span className="ml-2 shrink-0 text-sm font-semibold tabular-nums text-foreground">
              {performer.hours.toFixed(2)}h
            </span>
          </div>
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-foreground/20 transition-all"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
