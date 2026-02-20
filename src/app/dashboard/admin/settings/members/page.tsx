"use client";

import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { MembersIdleSettingsForm } from "@/widgets/settings/ui/members-idle-settings-form";

export default function MembersSettingsPage() {
  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Members settings"
        subTitle="Manage member access, roles, and tracking preferences"
      />
      <div className="p-2 md:p-6">
        <MembersIdleSettingsForm />

        {/*<SettingsSectionDescription*/}
        {/*  title="Individual idle settings"*/}
        {/*  subTitle="Override idle time for specific members"*/}
        {/*/>*/}
      </div>
    </DashboardContainer>
  );
}
