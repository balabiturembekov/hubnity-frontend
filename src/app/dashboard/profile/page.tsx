"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "@/entities/user";
import { ProfileEditDialog } from "@/features/auth";
import { Button } from "@/shared/ui/button";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header/ui/dashboard-page-header";
import {
  ProfileInfo,
  ProfilePageSkeleton,
  ProfileStatistics,
  ProfileStats,
  RecentActivity,
} from "@/widgets/profile";

export default function ProfilePage() {
  const { user, isInitializing } = useUserStore();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (isInitializing || !user) {
    return <ProfilePageSkeleton />;
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="My Profile"
        subTitle="View and manage your profile settings"
      >
        <Button onClick={() => setEditDialogOpen(true)} className="gap-2">
          <Edit className="h-4 w-4" />
          Edit Profile
        </Button>
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

        <div className="col-span-2">
          <RecentActivity />
        </div>
      </div>

      <ProfileEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </DashboardContainer>
  );
}
