"use client";

import { Clock } from "lucide-react";
import {
  type MedalRank,
  medalConfig,
} from "@/features/analytics/consts/medal-config";
import { getInitials } from "@/features/analytics/lib/aggregate-performers";
import type { Performer } from "@/features/analytics/model/types";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { CrownIcon } from "./crown-icon";

interface PodiumCardProps {
  performer: Performer;
  rank: MedalRank;
  maxHours: number;
}

export function PodiumCard({ performer, rank, maxHours }: PodiumCardProps) {
  const config = medalConfig[rank];
  const percentage = Math.round((performer.hours / maxHours) * 100);
  const isFirst = rank === 1;

  return (
    <div
      className={[
        "relative flex flex-col items-center rounded-2xl border bg-card p-5 transition-all hover:-translate-y-1",
        config.borderClass,
        config.shadowClass,
        isFirst
          ? "order-2 z-10 -mt-2 scale-[1.04]"
          : rank === 2
            ? "order-1"
            : "order-3",
      ].join(" ")}
    >
      {isFirst && (
        <div className="absolute -top-4 flex items-center justify-center">
          <div className={`rounded-full ${config.bgClass} p-1.5`}>
            <CrownIcon rank={1} />
          </div>
        </div>
      )}

      <div
        className={[
          "mb-3 flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
          config.bgClass,
          config.textClass,
          isFirst ? "mt-4" : "",
        ].join(" ")}
      >
        {rank}
      </div>

      <div className="relative mb-3">
        <Avatar className={`h-14 w-14 ring-2 ${config.ringClass}`}>
          <AvatarFallback
            className={`text-sm font-bold ${config.bgClass} ${config.textClass}`}
          >
            {getInitials(performer.userName)}
          </AvatarFallback>
        </Avatar>
      </div>

      <span className="mb-1 max-w-full truncate text-center text-sm font-semibold text-foreground">
        {performer.userName}
      </span>

      <div className="mb-3 flex items-center gap-1">
        <Clock className={`h-3.5 w-3.5 ${config.textClass}`} />
        <span className={`text-lg font-bold tabular-nums ${config.textClass}`}>
          {performer.hours.toFixed(2)}h
        </span>
      </div>

      <div className="w-full">
        <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
          <span>{performer.entriesCount} entries</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${percentage}%`,
              backgroundColor: config.color,
              opacity: 0.7,
            }}
          />
        </div>
      </div>
    </div>
  );
}
