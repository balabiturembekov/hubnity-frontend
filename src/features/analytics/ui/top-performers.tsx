"use client";

import { Award, TrendingUp, Trophy } from "lucide-react";
import { useGetAnalyticsWorkSessionQuery } from "@/entities/dashboard-analytics";
import { aggregateByUser } from "@/features/analytics/lib/aggregate-performers";
import type { Performer } from "@/features/analytics/model/types";
import { GraphSkeleton } from "@/widgets/skeleton";
import type { MedalRank } from "../consts/medal-config";
import { PodiumCard, RemainingRow } from "./top-performers/index";

export function TopPerformers() {
  const { data: workSessions, isPending } = useGetAnalyticsWorkSessionQuery({
    period: "this_month",
    limit: 6,
  });

  if (!workSessions || isPending) {
    return <GraphSkeleton />;
  }

  const sorted = aggregateByUser(workSessions.sessions);
  const topThree = sorted.slice(0, 3) as [Performer?, Performer?, Performer?];
  const rest = sorted.slice(3);
  const totalHours = sorted.reduce((acc, p) => acc + p.hours, 0);
  const maxHours = sorted[0]?.hours ?? 1;

  return (
    <div className="mx-auto w-full">
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-lg flex flex-col h-full">
        <div className="flex items-center justify-between border-b border-border px-6 py-5 gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--gold))]/10">
              <Trophy className="h-5 w-5 text-[hsl(var(--gold))]" />
            </div>
            <div>
              <h2 className="font-semibold tracking-tight text-foreground">
                Top Performers
              </h2>
              <p className="text-sm text-muted-foreground">
                Ranked by total hours logged
              </p>
            </div>
          </div>
          <div className="grid grid-cols-[auto_auto] items-center gap-x-2 gap-y-1 rounded-xl bg-muted px-3 py-2 min-w-[89px]">
            <TrendingUp className="h-4 w-4 text-muted-foreground row-span-1 sm:row-span-2" />
            <span className="text-base font-semibold tabular-nums text-right text-foreground leading-tight">
              {totalHours.toFixed(2)}
            </span>
            <span className="text-[9px] uppercase tracking-wider text-right text-muted-foreground col-span-2 sm:col-span-1">
              total hours
            </span>
          </div>
        </div>

        <div className="bg-accent/30 px-6 py-8 flex-1 flex items-center">
          <div className="grid min-[500px]:grid-cols-3 items-end gap-3 w-full">
            {topThree.map((performer, i) => {
              if (!performer) return null;

              return (
                <PodiumCard
                  key={performer.userName}
                  performer={performer}
                  rank={(i + 1) as MedalRank}
                  maxHours={maxHours}
                />
              );
            })}
          </div>
        </div>

        {rest.length > 0 && (
          <div className="flex flex-col gap-2 px-6 py-5">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <Award className="h-3.5 w-3.5" />
              <span>Other participants</span>
            </div>
            {rest.map((performer, i) => (
              <RemainingRow
                key={performer.userId}
                performer={performer}
                rank={i + 4}
                maxHours={maxHours}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
