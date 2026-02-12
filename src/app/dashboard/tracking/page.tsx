import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { ExportDialog } from "@/widgets/export";
import { DashboardPageHeader } from "@/widgets/header";
import {
  TimeEntriesTable,
  TimeEntryStatsCards,
  TodaysSummary,
} from "@/widgets/time-entry";

export default function TrackingPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">
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
            <TimeEntryStatsCards />

            <TodaysSummary />

            <TimeEntriesTable />
          </div>
        </main>
      </div>
    </div>
  );
}
