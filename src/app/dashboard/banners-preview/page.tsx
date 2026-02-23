import { Banner } from "@/widgets/banner";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";

export default function BannersPreviewPage() {
  return (
    <DashboardContainer>
      <DashboardPageHeader title="Banners preview" />

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
