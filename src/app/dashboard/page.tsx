import { MainDashboardHeader, OverviewSection } from "@/widgets/dashboard";
import { AnalyticsSection } from "@/widgets/dashboard/ui/analytics-section";
import { TimeEntriesTable } from "@/widgets/time-entry";

export default function DashboardPage() {
  return (
    <div className="flex h-screen overflow-scroll bg-background">
      <div className="flex flex-1 flex-col">
        <main className="bg-linear-to-b from-primary/5 via-background to-background">
          <MainDashboardHeader />

          <div className="p-6 space-y-6">
            <OverviewSection />
            <AnalyticsSection />
            <TimeEntriesTable />
          </div>
        </main>
      </div>
    </div>
  );
}
