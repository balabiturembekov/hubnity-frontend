import { TooltipProvider } from "@/shared/ui/tooltip";
import {
  MainDashboardHeader,
  OverviewSection,
  RecentActivityTable,
} from "@/widgets/dashboard";
import { AnalyticsSection } from "@/widgets/dashboard/ui/analytics-section";
import { TimeEntriesTable } from "@/widgets/time-entry";

export default function DashboardPage() {
  return (
    <TooltipProvider>
      <div className="flex overflow-auto bg-background">
        <div className="flex flex-1 flex-col">
          <main className="bg-linear-to-b overflow-y-auto from-primary/5 via-background to-background">
            <MainDashboardHeader />

            <div className="p-2 md:p-6 grid gap-4">
              <OverviewSection />
              <AnalyticsSection isPreview />
              <RecentActivityTable />
              <TimeEntriesTable isPreview />
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
