import { BarChart3 } from "lucide-react";
import { DailyChart, HourlyChart } from "@/features/analytics";
import { DashboardSectionHeader } from "@/widgets/header";

export const AnalyticsSection = () => {
  return (
    <section className="space-y-4">
      <DashboardSectionHeader
        title="Analytics"
        icon={BarChart3}
        link={{ label: "View All Reports", href: "/dashboard/admin/reports" }}
      />

      <div className="flex items-center gap-6 w-full">
        <HourlyChart />
        <DailyChart />
      </div>
    </section>
  );
};
