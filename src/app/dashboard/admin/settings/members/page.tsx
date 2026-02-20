"use client";

import { Card, CardContent } from "@/shared/ui/card";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { MembersIdleList } from "@/widgets/settings/ui/members-idle-list";
import { MembersIdleSettingsForm } from "@/widgets/settings/ui/members-idle-settings-form";
import { SettingsSectionDescription } from "@/widgets/settings/ui/settings-section-description";

export default function MembersSettingsPage() {
  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Members settings"
        subTitle="Manage member access, roles, and tracking preferences"
      />

      <div className="p-2 md:p-6 space-y-8">
        <MembersIdleSettingsForm />

        <Card>
          <CardContent className="space-y-6">
            <SettingsSectionDescription
              title="Individual idle settings"
              subTitle="Override idle time for specific members"
            />
            <MembersIdleList />
          </CardContent>
        </Card>
      </div>
    </DashboardContainer>
  );
}
