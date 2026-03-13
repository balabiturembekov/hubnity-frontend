import { Banner, CustomBanner } from "@/widgets/banner";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";

export default function BannersPreviewPage() {
  return (
    <DashboardContainer>
      <DashboardPageHeader title="Banners preview" />

      <CustomBanner
        title="✨ Now there's an easier way to check members' activity"
        description="Introducing Smart Notifications: Get notified about changes in your members' and teams' work metrics and step in early to offer extra assistance or encouragement when needed."
        bgFrom="from-blue-800"
        bgTo="to-blue-400"
        imageSrc="https://server-assets.hubstaff.com/2fa0192730/vite/smart_notifications_banner-B0LMRj9G.svg"
        mainButtonHref="/dashboard/admin/banners-preview?type=main"
        mainButtonText="Create notification"
        secondaryButtonHref="/dashboard/admin/banners-preview?type=secondary"
        secondaryButtonText="View all templates"
      />

      <div className="p-6 flex flex-col gap-5">
        <Banner />
        <Banner variant="blue" />
        <Banner variant="success" />
        <Banner variant="warning" />
        <Banner variant="danger" />
      </div>
    </DashboardContainer>
  );
}
