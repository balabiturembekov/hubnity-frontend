"use client";

import { ArrowRight, Expand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { ScreenshotEntity } from "@/entities/screenshot";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { UserAvatar, useGetCurrentUserQuery } from "@/entities/user";
import { ScreenshotFullscreenViewer } from "@/features/screenshot-viewer";
import { apiUrl } from "@/shared/config/env";
import { formatDate } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";

interface RecentActivityItemProps extends TimeEntryEntity {
  screenshots: ScreenshotEntity[];
}

export const RecentActivityItem = ({
  user,
  screenshots,
}: RecentActivityItemProps) => {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { data: currentUser } = useGetCurrentUserQuery();

  if (!screenshots.length) {
    return null;
  }

  const handleScreenshotClick = (index: number) => {
    setSelectedIndex(index);
    setViewerOpen(true);
  };

  const viewAllLink =
    currentUser?.id === user.id
      ? "/dashboard/profile?tab=screenshots"
      : `/dashboard/admin/employees/${user.id}?tab=screenshots`;

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <UserAvatar name={user.name} />
            <span className="text-sm font-medium">{user.name}</span>
          </div>

          <Button variant="link" className="group text-xs" asChild>
            <Link href={viewAllLink}>
              View all
              <ArrowRight className="group-hover:translate-x-1 transition-transform size-3.5" />
            </Link>
          </Button>
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
};
