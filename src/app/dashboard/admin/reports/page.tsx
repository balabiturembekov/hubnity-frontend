"use client";

import { AdminGuard } from "@/features/auth";
import { ReportsPeriodSelect } from "@/features/reports";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { AnalyticsSection } from "@/widgets/dashboard/ui/analytics-section";
import { ExportDialog } from "@/widgets/export";
import { DashboardPageHeader } from "@/widgets/header";
import { ReportsStatsSection } from "@/widgets/reports";

export default function AdminReportsPage() {
  return (
    <AdminGuard>
      <TooltipProvider>
        <div className="flex h-screen overflow-auto bg-background">
          <div className="flex flex-1 flex-col">
            <main className="flex-1 overflow-y-auto">
              <div className="bg-linear-to-b from-primary/5 via-background to-background">
                <DashboardPageHeader
                  title="Reports"
                  subTitle="Analyze time tracking data and generate insights"
                >
                  <ReportsPeriodSelect />
                  <ExportDialog />
                </DashboardPageHeader>

                <div className="p-6">
                  <div className="space-y-6">
                    <ReportsStatsSection />
                    <AnalyticsSection />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </AdminGuard>
  );
}
