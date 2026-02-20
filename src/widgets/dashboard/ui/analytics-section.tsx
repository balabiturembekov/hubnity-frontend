import { BarChart3 } from "lucide-react";
import {
  DailyChart,
  HourlyChart,
  MonthlyChart,
  ProjectsChart,
  TopPerformers,
  useHourlyData,
} from "@/features/analytics";
import { useDailyData } from "@/features/analytics/hooks/use-daily-data";
import { DashboardSectionHeader } from "@/widgets/header";
import { DashboardSectionHeaderSkeleton } from "@/widgets/skeleton";

interface AnalyticsSectionProps {
  isPreview?: boolean;
}

export const AnalyticsSection = ({
  isPreview = false,
}: AnalyticsSectionProps) => {
  const { isPending: isPendingHourly } = useHourlyData();
  const { isPending: isPendingDaily } = useDailyData();

  const isPending = isPendingHourly || isPendingDaily;

  return (
    <section className="space-y-4">
      {isPending ? (
        <DashboardSectionHeaderSkeleton />
      ) : (
        <DashboardSectionHeader
          title="Analytics"
          icon={BarChart3}
          link={
            isPreview
              ? { label: "View All Reports", href: "/dashboard/admin/reports" }
              : undefined
          }
        />
      )}

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
