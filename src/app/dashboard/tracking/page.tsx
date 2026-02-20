"use client";

import { useCurrentUser, useUser } from "@/entities/user";
import { ExportDialog } from "@/widgets/export";
import { DashboardPageHeader } from "@/widgets/header";
import {
  TimeEntriesTable,
  TimeEntryStatsCards,
  TodaySummary,
} from "@/widgets/time-entry";

export default function TrackingPage() {
  const { isAdmin } = useUser();
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) return null;

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
            <TodaySummary />
            <TimeEntriesTable />
          </div>
        </main>
      </div>
    </div>
  );
}
