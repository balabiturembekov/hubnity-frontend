"use client";

import { useGetCurrentUserQuery } from "@/entities/user";
import { ActivityTrackingTabs } from "@/widgets/activity-tracking";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { MembersPageSkeleton } from "@/widgets/members";

export default function ActivityTrackingSettingsPage() {
  const { data, isPending } = useGetCurrentUserQuery();

  if (isPending || !data) {
    return <MembersPageSkeleton />;
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Activity & Tracking"
        subTitle="Manage member access, roles, and tracking preferences"
      />

      <div className="p-2 md:p-6">
        <ActivityTrackingTabs />
      </div>
    </DashboardContainer>
  );
}
