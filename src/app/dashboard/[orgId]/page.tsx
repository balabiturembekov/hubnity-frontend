"use client";

import { useGetCurrentUserQuery } from "@/entities/user";
import { Banner } from "@/widgets/banner";
import {
  AppUrlsSection,
  DashboardContainer,
  DashboardPageSkeleton,
  MainDashboardHeader,
  OverviewSection,
  ScreenshotActivitySection,
} from "@/widgets/dashboard";
import { AnalyticsSection } from "@/widgets/dashboard/ui/analytics-section";
import { TimeEntriesTable } from "@/widgets/time-entry";

export default function DashboardPage() {
  const { data, isPending } = useGetCurrentUserQuery();

  if (isPending || !data) {
    return <DashboardPageSkeleton />;
  }

  return (
    <DashboardContainer>
      <MainDashboardHeader />

      <div className="p-2 md:p-6 grid gap-4">
        <Banner variant="blue" />

        <OverviewSection />
        <AnalyticsSection isPreview />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <ScreenshotActivitySection />
          <div className="space-y-4">
            <AppUrlsSection />
            <ScreenshotActivitySection variant="lowActivity" />
          </div>
        </div>
        <TimeEntriesTable isPreview />
      </div>
    </DashboardContainer>
  );
}
