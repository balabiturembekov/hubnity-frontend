"use client";

import { History, Images, TrendingDown } from "lucide-react";
import {
  RecentActivityItem,
  useGetScreenshotsByTimeEntriesQuery,
} from "@/entities/screenshot";
import { useGetTimeEntriesQuery } from "@/entities/time-entry";
import { Card, CardContent } from "@/shared/ui/card";
import { EmptyState } from "@/widgets/empty-state";
import { DashboardSectionHeader } from "@/widgets/header";
import { ScreenshotsSkeleton } from "@/widgets/skeleton";

interface ScreenshotActivitySectionProps {
  variant?: "default" | "lowActivity";
}

export function ScreenshotActivitySection({
  variant = "default",
}: ScreenshotActivitySectionProps) {
  const { data: entries, isPending: isPendingEntries } = useGetTimeEntriesQuery(
    {
      limit: variant === "default" ? 3 : 2,
    },
  );

  const entryIds = entries?.map((entry) => entry.id) ?? [];

  const screenshotQueries = useGetScreenshotsByTimeEntriesQuery({
    timeEntryIds: entryIds,
  });

  const isPendingScreenshots = screenshotQueries.some((q) => q.isPending);
  const hasAnyScreenshots = screenshotQueries.some(
    (q) => (q.data?.length ?? 0) > 0,
  );

  const hasEntries = entries && entries.length > 0;
  const showEmptyState =
    hasEntries &&
    !isPendingEntries &&
    !isPendingScreenshots &&
    !hasAnyScreenshots;

  if (isPendingEntries || isPendingScreenshots) {
    return <ScreenshotsSkeleton />;
  }

  return (
    <section className="space-y-4">
      <DashboardSectionHeader
        title={variant === "default" ? "Recent Activity" : "Low Activity"}
        icon={variant === "default" ? History : TrendingDown}
      />
      <Card>
        <CardContent className="flex flex-col gap-8">
          {showEmptyState ? (
            <EmptyState
              icon={<Images className="h-12 w-12 mx-auto" />}
              title="No screenshots yet"
              description="Recent time entries don't have any screenshots. Start tracking time with screenshots to see activity here."
              className="py-8"
            />
          ) : (
            entries?.map((activity, index) => {
              const screenshotsByEntry = screenshotQueries[index]?.data ?? [];

              return (
                <RecentActivityItem
                  key={activity.id}
                  {...activity}
                  screenshots={screenshotsByEntry}
                />
              );
            })
          )}
        </CardContent>
      </Card>
    </section>
  );
}
