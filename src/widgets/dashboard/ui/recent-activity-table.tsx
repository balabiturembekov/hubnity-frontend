"use client";

import { Expand, History, UserRound } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useScreenshotsByTimeEntryQuery } from "@/entities/screenshot";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { useGetTimeEntriesQuery } from "@/entities/time-entry";
import { ScreenshotFullscreenViewer } from "@/features/screenshot-viewer";
import { apiUrl } from "@/shared/config/env";
import { formatDate } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { DashboardSectionHeader } from "@/widgets/header";

function RecentActivityItem({ id, user }: TimeEntryEntity) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: screenshots } = useScreenshotsByTimeEntryQuery(id);

  if (!screenshots) {
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

        <div className="flex items-center justify-between gap-3 w-full">
          {screenshots.slice(0, 3).map((screenshot, index) => (
            <div key={screenshot.id} className="relative group">
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
  const { data: entries } = useGetTimeEntriesQuery({ limit: 3 });

  if (!entries) return <div>Loading...</div>;

  return (
    <section className="space-y-4">
      <DashboardSectionHeader title="Recent Activity" icon={History} />
      <Card>
        <CardContent className="flex flex-col gap-8">
          {entries.map((activity) => (
            <RecentActivityItem {...activity} key={activity.id} />
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
