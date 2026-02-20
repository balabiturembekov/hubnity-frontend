import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { ScreenshotSettings } from "@/widgets/screenshot-settings";

export default function ActivityTrackingSettingsPage() {
  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Activity & Tracking"
        subTitle="Manage member access, roles, and tracking preferences"
      />

      <div className="p-2 md:p-6">
        <ScreenshotSettings />
      </div>
    </DashboardContainer>
  );
}
