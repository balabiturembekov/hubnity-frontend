"use client";

import {
  Activity,
  Calendar,
  Clock,
  Edit,
  FileText,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { useUserStore } from "@/entities/user";
import { formatDurationFull } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { Header } from "@/widgets/header";
import { ProfileInfo, ProfileStats } from "@/widgets/profile";

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

  // Show loading state while initializing
  // Use hasToken state to avoid hydration mismatch
  if (isInitializing || !user) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton className="h-9 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
                <Skeleton className="h-10 w-32" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i}>
                    <CardHeader>
                      <Skeleton className="h-4 w-24" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-16" />
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card>
                <CardHeader>
                  <Skeleton className="h-6 w-40" />
                  <Skeleton className="h-4 w-48" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </CardContent>
              </Card>
              <div>
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="h-[300px] w-full" />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="bg-linear-to-b from-primary/5 via-background to-background">
            {/* Header Section */}
            <div className="border-b bg-card px-6 py-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                    My Profile
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    View and manage your profile settings
                  </p>
                </div>
                <Button
                  onClick={() => setEditDialogOpen(true)}
                  className="gap-2"
                >
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-6">
              <div className="space-y-6">
                {/* Stats Cards */}
                <ProfileStats />

                <div className="grid gap-6 md:grid-cols-2">
                  {/* Profile Info */}
                  <ProfileInfo />

                  {/* Statistics */}
                  <Card className="transition-shadow hover:shadow-md">
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <CardTitle>Time Statistics</CardTitle>
                      </div>
                      <CardDescription>
                        Your tracked time overview
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="rounded-lg bg-primary/5 p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm">Total Hours</span>
                          </div>
                          <p className="text-2xl font-bold">
                            {/* COMMENT */}
                            {/* {formatDurationFull(totalHours)} */}
                            {formatDurationFull(1)}
                          </p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            Total Entries
                          </span>
                          <span className="text-sm font-semibold">
                            {/* COMMENT */}
                            {/* {totalEntries} */}1
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3 pt-4 border-t">
                        <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              Today
                            </span>
                          </div>
                          <span className="text-sm font-semibold">
                            {/* COMMENT */}
                            {/* {formatDurationFull(todayHours)} */}
                            {formatDurationFull(1)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              This Week
                            </span>
                          </div>
                          <span className="text-sm font-semibold">
                            {/* COMMENT */}
                            {/* {formatDurationFull(weekHours)} */}
                            {formatDurationFull(1)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              This Month
                            </span>
                          </div>
                          <span className="text-sm font-semibold">
                            {/* COMMENT */}
                            {/* {formatDurationFull(monthHours)} */}
                            {formatDurationFull(1)}
                          </span>
                        </div>
                      </div>

                      {/* {activeEntries > 0 && (
                        <div className="pt-4 border-t">
                          <div className="flex items-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-green-700">
                                {activeEntries} active{" "}
                                {activeEntries === 1 ? "timer" : "timers"}
                              </p>
                              <p className="text-xs text-green-600">
                                You have running time entries
                              </p>
                            </div>
                          </div>
                        </div>
                      )} */}
                    </CardContent>
                  </Card>
                </div>

                {/* Recent Activity */}
                {/* <Card className="transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      <CardTitle>Recent Time Entries</CardTitle>
                      <Badge variant="secondary" className="ml-2">
                        {myEntries.filter((e) => e.status === "stopped").length}
                      </Badge>
                    </div>
                    <CardDescription>
                      Your latest tracked time entries
                    </CardDescription>
                  </CardHeader> */}
                {/* <CardContent>
                    {myEntries.length === 0 ? (
                      <div className="text-center py-12">
                        <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <p className="text-sm text-muted-foreground">
                          No time entries yet. Start tracking your time to see
                          entries here.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {myEntries
                          .filter((e) => e.status === "stopped")
                          .slice(0, 5)
                          .map((entry) => (
                            <div
                              key={entry.id}
                              className="flex items-center justify-between p-4 rounded-lg border transition-colors hover:bg-muted/50 hover:shadow-sm"
                            >
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  {entry.projectName && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      {entry.projectName}
                                    </Badge>
                                  )}
                                  {!entry.projectName && (
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      No project
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mb-1">
                                  {(() => {
                                    // Safely parse dates
                                    let startDate: Date | null = null;
                                    let endDate: Date | null = null;
                                    try {
                                      const start = new Date(entry.startTime);
                                      if (!Number.isNaN(start.getTime())) {
                                        startDate = start;
                                      }
                                      if (entry.endTime) {
                                        const end = new Date(entry.endTime);
                                        if (!Number.isNaN(end.getTime())) {
                                          endDate = end;
                                        }
                                      }
                                    } catch {
                                      // Invalid dates - will show fallback
                                    }

                                    if (!startDate) {
                                      return "Invalid date";
                                    }

                                    return (
                                      <>
                                        {format(
                                          startDate,
                                          "MMM dd, yyyy HH:mm",
                                        )}
                                        {endDate && (
                                          <> - {format(endDate, "HH:mm")}</>
                                        )}
                                      </>
                                    );
                                  })()}
                                </p>
                                {entry.description && (
                                  <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                                    {entry.description}
                                  </p>
                                )}
                              </div>
                              <div className="text-right ml-4">
                                <p className="text-sm font-semibold">
                                  {(() => {
                                    const duration = entry.duration;
                                    if (
                                      duration === null ||
                                      duration === undefined ||
                                      !Number.isFinite(duration) ||
                                      Number.isNaN(duration) ||
                                      duration < 0
                                    ) {
                                      return formatDurationFull(0);
                                    }
                                    return formatDurationFull(duration / 3600);
                                  })()}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  duration
                                </p>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card> */}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* <ProfileEditDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      /> */}
    </div>
  );
}
