"use client";

import { useCurrentUser } from "@/entities/user";
import { TooltipProvider } from "@/shared/ui/tooltip";
import {
  DashboardPageSkeleton,
  MainDashboardHeader,
  OverviewSection,
  RecentActivityTable,
} from "@/widgets/dashboard";
import { AnalyticsSection } from "@/widgets/dashboard/ui/analytics-section";
import { TimeEntriesTable } from "@/widgets/time-entry";

export default function DashboardPage() {
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) {
    return <DashboardPageSkeleton />;
  }

  return (
    <TooltipProvider>
      <div className="flex overflow-auto bg-background">
        <div className="flex flex-1 flex-col">
          <main className="bg-linear-to-b overflow-y-auto from-primary/5 via-background to-background">
            <MainDashboardHeader />

            <div className="p-2 md:p-6 grid gap-4">
              <OverviewSection />
              <AnalyticsSection isPreview />
              <RecentActivityTable />
              <TimeEntriesTable isPreview />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
