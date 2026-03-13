"use client";

import { useGetCurrentUserByOrganizationQuery } from "@/entities/organization";
import { EditProfileButton } from "@/features/user";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header/ui/dashboard-page-header";
import {
  ProfileInfo,
  ProfilePageSkeleton,
  ProfileStatistics,
  ProfileStats,
  ProfileTabs,
} from "@/widgets/profile";

export default function ProfilePage() {
  const { data, isPending } = useGetCurrentUserByOrganizationQuery();

  if (isPending || !data) {
    return <ProfilePageSkeleton />;
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="My Profile"
        subTitle="View and manage your profile settings"
      >
        <EditProfileButton />
      </DashboardPageHeader>

      <div className="grid grid-cols-2 p-2 md:p-6 gap-4">
        <div className="col-span-2">
          <ProfileStats />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <ProfileInfo />
        </div>

        <div className="col-span-2 lg:col-span-1">
          <ProfileStatistics />
        </div>

        <ProfileTabs />
      </div>
    </DashboardContainer>
  );
}
