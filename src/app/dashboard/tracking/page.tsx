"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { ExportDialog } from "@/widgets/export";
import { DashboardPageHeader } from "@/widgets/header";
import {
  TimeEntriesTable,
  TimeEntryStatsCards,
  TodaySummary,
} from "@/widgets/time-entry";

export default function TrackingPage() {
  const { isAdmin } = useUser();

  return (
    <div className="flex h-screen overflow-auto bg-background">
      <div className="flex flex-1 flex-col">
        <main className="bg-linear-to-b from-primary/5 via-background to-background">
          <DashboardPageHeader
            title="Time Tracking"
            subTitle="Track your work time and manage your entries"
          >
            <ExportDialog />
            <Button variant="outline" className="gap-2" asChild>
              <Link href="/dashboard">
                <ArrowRight className="h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </DashboardPageHeader>

          <div className="p-6 space-y-6">
            {isAdmin && <TimeEntryStatsCards />}

            <TodaySummary />

            <TimeEntriesTable />
          </div>
        </main>
      </div>
    </div>
  );
}
