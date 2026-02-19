"use client";

import { useUserStore } from "@/entities/user";
import { AdminGuard } from "@/features/auth";
import { ReportsPeriodSelect } from "@/features/reports";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { AnalyticsSection } from "@/widgets/dashboard/ui/analytics-section";
import { ExportDialog } from "@/widgets/export";
import { DashboardPageHeader } from "@/widgets/header";
import { ReportsPageSkeleton, ReportsStatsSection } from "@/widgets/reports";

export default function AdminReportsPage() {
  const { user, isInitializing } = useUserStore();

  if (isInitializing || !user) {
    return <ReportsPageSkeleton />;
  }

  return (
    <AdminGuard>
      <TooltipProvider>
        <div className="flex h-screen overflow-auto bg-background">
          <div className="flex flex-1 flex-col">
            <main className="bg-linear-to-b from-primary/5 via-background to-background">
              <DashboardPageHeader
                title="Reports"
                subTitle="Analyze time tracking data and generate insights"
              >
                <ReportsPeriodSelect />
                <ExportDialog />
              </DashboardPageHeader>

              <div className="p-2 md:p-6 grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <ReportsStatsSection />
                </div>
                <div className="col-span-2">
                  <AnalyticsSection />
                </div>
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </AdminGuard>
  );
}
