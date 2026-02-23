"use client";

import { ArrowRight, Edit } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCurrentUser } from "@/entities/user";
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
import { AppsUrlsTable } from "@/widgets/reports";

export default function ProfilePage() {
  const { data, isPending } = useCurrentUser();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  if (isPending || !data) {
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

        <div className="col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Apps & URLs</h3>
            <Button variant="link" asChild>
              <Link href="/dashboard/admin/summaries/full-reports?tab=me">
                View full report <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <AppsUrlsTable isAll={false} limit={5} />
        </div>
      </div>

      <ProfileEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </DashboardContainer>
  );
}
