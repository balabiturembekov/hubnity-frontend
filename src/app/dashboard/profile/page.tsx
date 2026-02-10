"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import { useUserStore } from "@/entities/user";
import { ProfileEditDialog } from "@/features/auth";
import { Button } from "@/shared/ui/button";
import { DashboardPageHeader } from "@/widgets/header/ui/dashboard-page-header";
import {
  PageSkeleton,
  ProfileInfo,
  ProfileStatistics,
  ProfileStats,
  RecentActivity,
} from "@/widgets/profile";

export default function ProfilePage() {
  // const { currentUser, timeEntries, loadTimeEntries, initializeAuth } = useStore();
  const { user, isInitializing } = useUserStore();
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  // // Calculate personal statistics (memoized for performance)
  // // IMPORTANT: This hook MUST be called before any conditional returns to follow Rules of Hooks
  // const stats = useMemo(() => {
  //   if (!currentUser) {
  //     return {
  //       totalHours: 0,
  //       todayHours: 0,
  //       weekHours: 0,
  //       monthHours: 0,
  //       totalEntries: 0,
  //       activeEntries: 0,
  //       myEntries: [],
  //     };
  //   }

  //   const myEntries = (
  //     timeEntries && Array.isArray(timeEntries) ? timeEntries : []
  //   ).filter((e) => e.userId === currentUser.id);

  //   // Helper function to safely get duration
  //   const getDuration = (e: any): number => {
  //     const duration = e.duration;
  //     if (
  //       duration === null ||
  //       duration === undefined ||
  //       !isFinite(duration) ||
  //       isNaN(duration) ||
  //       duration < 0
  //     ) {
  //       return 0;
  //     }
  //     return duration;
  //   };

  //   // Helper function to safely parse date (handles both Date and string)
  //   const parseDate = (dateInput: Date | string): Date | null => {
  //     try {
  //       // If it's already a Date, validate it
  //       if (dateInput instanceof Date) {
  //         if (isNaN(dateInput.getTime())) {
  //           return null;
  //         }
  //         return dateInput;
  //       }
  //       // If it's a string, parse it
  //       const date = new Date(dateInput);
  //       if (isNaN(date.getTime())) {
  //         return null;
  //       }
  //       return date;
  //     } catch {
  //       return null;
  //     }
  //   };

  //   // Calculate total hours (only stopped entries)
  //   const totalHours =
  //     myEntries
  //       .filter((e) => e.status === "stopped")
  //       .reduce((acc, e) => acc + getDuration(e), 0) / 3600;

  //   // Validate totalHours
  //   const validTotalHours =
  //     isFinite(totalHours) && !isNaN(totalHours) && totalHours >= 0
  //       ? totalHours
  //       : 0;

  //   // Calculate today hours
  //   const today = new Date();
  //   today.setHours(0, 0, 0, 0);
  //   const todayHours =
  //     myEntries
  //       .filter((e) => {
  //         if (e.status !== "stopped") return false;
  //         const entryDate = parseDate(e.startTime);
  //         if (!entryDate) return false;
  //         return entryDate >= today;
  //       })
  //       .reduce((acc, e) => acc + getDuration(e), 0) / 3600;
  //   const validTodayHours =
  //     isFinite(todayHours) && !isNaN(todayHours) && todayHours >= 0
  //       ? todayHours
  //       : 0;

  //   // Calculate week hours
  //   const thisWeek = new Date();
  //   thisWeek.setDate(thisWeek.getDate() - 7);
  //   const weekHours =
  //     myEntries
  //       .filter((e) => {
  //         if (e.status !== "stopped") return false;
  //         const entryDate = parseDate(e.startTime);
  //         if (!entryDate) return false;
  //         return entryDate >= thisWeek;
  //       })
  //       .reduce((acc, e) => acc + getDuration(e), 0) / 3600;
  //   const validWeekHours =
  //     isFinite(weekHours) && !isNaN(weekHours) && weekHours >= 0
  //       ? weekHours
  //       : 0;

  //   // Calculate month hours
  //   const thisMonth = new Date();
  //   thisMonth.setMonth(thisMonth.getMonth() - 1);
  //   const monthHours =
  //     myEntries
  //       .filter((e) => {
  //         if (e.status !== "stopped") return false;
  //         const entryDate = parseDate(e.startTime);
  //         if (!entryDate) return false;
  //         return entryDate >= thisMonth;
  //       })
  //       .reduce((acc, e) => acc + getDuration(e), 0) / 3600;
  //   const validMonthHours =
  //     isFinite(monthHours) && !isNaN(monthHours) && monthHours >= 0
  //       ? monthHours
  //       : 0;

  //   const totalEntries = myEntries.filter((e) => e.status === "stopped").length;
  //   const activeEntries = myEntries.filter(
  //     (e) => e.status === "running",
  //   ).length;

  //   return {
  //     totalHours: validTotalHours,
  //     todayHours: validTodayHours,
  //     weekHours: validWeekHours,
  //     monthHours: validMonthHours,
  //     totalEntries,
  //     activeEntries,
  //     myEntries,
  //   };
  // }, [timeEntries, currentUser]);

  // const {
  //   totalHours,
  //   todayHours,
  //   weekHours,
  //   monthHours,
  //   totalEntries,
  //   activeEntries,
  //   myEntries,
  // } = stats;

  if (isInitializing || !user) {
    return <PageSkeleton />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">
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
