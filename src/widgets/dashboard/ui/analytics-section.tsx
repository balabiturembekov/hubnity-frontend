import { BarChart3 } from "lucide-react";
import {
  DailyChart,
  HourlyChart,
  MonthlyChart,
  ProjectsChart,
  TopPerformers,
} from "@/features/analytics";
import { DashboardSectionHeader } from "@/widgets/header";

interface AnalyticsSectionProps {
  isPreview?: boolean;
}

export const AnalyticsSection = ({
  isPreview = false,
}: AnalyticsSectionProps) => {
  return (
    <section className="space-y-4">
      <DashboardSectionHeader
        title="Analytics"
        icon={BarChart3}
        link={{ label: "View All Reports", href: "/dashboard/admin/reports" }}
      />

      <div className="grid xl:grid-cols-2 gap-4">
        <HourlyChart />
        <DailyChart />
      </div>

      {!isPreview && <MonthlyChart />}
      {!isPreview && (
        <div className="grid xl:grid-cols-2 gap-4">
          <ProjectsChart />
          <TopPerformers />
        </div>
      )}
    </section>
  );
};
