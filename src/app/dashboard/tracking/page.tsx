"use client";

import { useCurrentUser, useUser } from "@/entities/user";
import { ExportDialog } from "@/widgets/export";
import { DashboardPageHeader } from "@/widgets/header";
import { TimeEntriesTable, TimeEntryStatsCards } from "@/widgets/time-entry";
import { TrackingPageSkeleton } from "@/widgets/tracking";

export default function TrackingPage() {
  const { isAdmin } = useUser();
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) {
    return <TrackingPageSkeleton />;
  }

  return (
    <div className="flex h-screen overflow-auto bg-background">
      <div className="flex flex-1 flex-col">
        <main className="bg-linear-to-b from-primary/5 via-background to-background">
          <DashboardPageHeader
            title="Time Tracking"
            subTitle="Track your work time and manage your entries"
          >
            <ExportDialog />
          </DashboardPageHeader>

          <div className="p-2 md:p-6 grid gap-4">
            {isAdmin && <TimeEntryStatsCards />}
            <div className="grid md:grid-cols-2 gap-4">
              {/*<TodaySummary />*/}
            </div>
            <TimeEntriesTable />
          </div>
        </main>
      </div>
    </div>
  );
}
