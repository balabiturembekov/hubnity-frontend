"use client";

import { Skeleton } from "@/shared/ui/skeleton";

export const DashboardHeaderSkeleton = () => {
  return (
    <header className="flex min-h-16 items-center justify-between border-b px-6 bg-background">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Dashboard</h2>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="size-10 rounded-full" />

        <div className="flex items-center gap-2 p-1">
          <Skeleton className="size-10 rounded-full" />
          <div className="flex flex-col gap-1 mr-1">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </header>
  );
};
