import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { SettingsCards } from "@/widgets/settings";

export default function SettingsPage() {
  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Settings"
        subTitle="Configure organization, members, tracking, policies, integrations and billing"
      />

      <div className="p-2 md:p-6">
        <SettingsCards />
      </div>
    </DashboardContainer>
  );
}
