import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";

export default function JobsPage() {
  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Jobs"
        subTitle="Create, assign, and manage project tasks"
      />

      <div className="p-2 md:p-6 grid gap-4">Jobs</div>
    </DashboardContainer>
  );
}
