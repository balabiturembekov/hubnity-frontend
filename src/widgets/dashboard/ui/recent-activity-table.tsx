"use client";

import { Expand, History, Images, UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  type ScreenshotEntity,
  useScreenshotsByTimeEntryQuery,
} from "@/entities/screenshot";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { useGetTimeEntriesQuery } from "@/entities/time-entry";
import { ScreenshotFullscreenViewer } from "@/features/screenshot-viewer";
import { apiUrl } from "@/shared/config/env";
import { formatDate } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { EmptyState } from "@/widgets/empty-state";
import { DashboardSectionHeader } from "@/widgets/header";
import { ScreenshotsSkeleton } from "@/widgets/skeleton";

interface RecentActivityItemProps extends TimeEntryEntity {
  screenshots: ScreenshotEntity[];
}

function RecentActivityItem({ user, screenshots }: RecentActivityItemProps) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (!screenshots.length) {
    return null;
  }

  const handleScreenshotClick = (index: number) => {
    setSelectedIndex(index);
    setViewerOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sky-400 flex items-center justify-center text-white">
            <UserRound size={18} />
          </div>
          <span className="text-sm font-medium">{user.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {screenshots.slice(0, 3).map((screenshot, index) => (
            <div key={screenshot.id} className="relative group w-fit">
              <Badge className="bg-yellow-500 absolute -top-2 -right-2 z-5 shadow-lg">
                50%
              </Badge>
              <Image
                src={`${apiUrl}${screenshot.imageUrl}`}
                alt={screenshot.imageUrl}
                width={500}
                height={281.25}
                quality={40}
                className="group-hover:blur-xs transition-all group-hover:opacity-30"
              />
              <button
                type="button"
                className="w-full h-full cursor-pointer group-hover:opacity-100 opacity-0 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all"
                onClick={() => handleScreenshotClick(index)}
              >
                <div className="flex items-center flex-col gap-3">
                  <Button variant="outline" asChild>
                    <div>
                      <Expand />
                      View screen
                    </div>
                  </Button>
                  <p className="text-sm">{formatDate(screenshot.timestamp)}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <ScreenshotFullscreenViewer
        screenshots={screenshots}
        initialIndex={selectedIndex}
        open={viewerOpen}
        onOpenChange={setViewerOpen}
      />
    </>
  );
}

export function RecentActivityTable() {
  const { data: entries, isPending } = useGetTimeEntriesQuery({ limit: 3 });

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
      <DashboardSectionHeader title="Recent Activity" icon={History} />
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
