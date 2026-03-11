"use client";

import { useOrganizationRole } from "@/entities/organization";
import { useGetCurrentUserQuery } from "@/entities/user";
import { DashboardContainer } from "@/widgets/dashboard";
import { ExportDialog } from "@/widgets/export";
import { DashboardPageHeader } from "@/widgets/header";
import { TimeEntriesTable, TimeEntryStatsCards } from "@/widgets/time-entry";
import { TrackingPageSkeleton } from "@/widgets/tracking";

export default function TrackingPage() {
  const { isAdmin } = useOrganizationRole();
  const { data, isPending } = useGetCurrentUserQuery();

  if (isPending || !data) {
    return <TrackingPageSkeleton />;
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Time Tracking"
        subTitle="Track your work time and manage your entries"
      >
        <ExportDialog />
      </DashboardPageHeader>

      <div className="p-2 md:p-6 grid gap-4">
        {isAdmin && <TimeEntryStatsCards />}
        {/* <div className="grid md:grid-cols-2 gap-4">
              <TodaySummary />
            </div> */}
        <TimeEntriesTable />
      </div>
    </DashboardContainer>
  );
}
