"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "@/entities/user";
import { ProfileEditDialog } from "@/features/auth";
import { Button } from "@/shared/ui/button";
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
    <div className="flex h-screen overflow-auto bg-background">
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto">
          <div className="bg-linear-to-b from-primary/5 via-background to-background">
            <DashboardPageHeader
              title="My Profile"
              subTitle="View and manage your profile settings"
            >
              <Button onClick={() => setEditDialogOpen(true)} className="gap-2">
                <Edit className="h-4 w-4" />
                Edit Profile
              </Button>
            </DashboardPageHeader>

            <div className="p-6">
              <div className="space-y-6">
                <ProfileStats />

                <div className="grid gap-6 md:grid-cols-2">
                  <ProfileInfo />
                  <ProfileStatistics />
                </div>

                <RecentActivity />
              </div>
            </div>
          </div>
        </main>
      </div>

      <ProfileEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  );
}
