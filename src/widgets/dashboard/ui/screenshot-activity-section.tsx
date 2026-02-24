"use client";

import { History, Images, TrendingDown } from "lucide-react";
import {
  RecentActivityItem,
  useScreenshotsByTimeEntryQuery,
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
  const { data: entries, isPending } = useGetTimeEntriesQuery({
    limit: variant === "default" ? 3 : 2,
  }); // TODO: send request depending on variant

  const entryId0 = entries?.[0]?.id ?? "";
  const entryId1 = entries?.[1]?.id ?? "";
  const entryId2 = entries?.[2]?.id ?? "";

  const screenshots0 = useScreenshotsByTimeEntryQuery(entryId0);
  const screenshots1 = useScreenshotsByTimeEntryQuery(entryId1);
  const screenshots2 = useScreenshotsByTimeEntryQuery(entryId2);

  const isPendingScreenshots =
    (!!entryId0 && screenshots0.isPending) ||
    (!!entryId1 && screenshots1.isPending) ||
    (!!entryId2 && screenshots2.isPending);

  const hasAnyScreenshots =
    (screenshots0.data?.length ?? 0) > 0 ||
    (screenshots1.data?.length ?? 0) > 0 ||
    (screenshots2.data?.length ?? 0) > 0;

  const hasEntries = entries && entries.length > 0;
  const showEmptyState =
    hasEntries && !isPending && !isPendingScreenshots && !hasAnyScreenshots;

  if (!entries || isPending) {
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
            entries.map((activity, index) => {
              const screenshotsByEntry =
                [screenshots0.data, screenshots1.data, screenshots2.data][
                  index
                ] ?? [];
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
