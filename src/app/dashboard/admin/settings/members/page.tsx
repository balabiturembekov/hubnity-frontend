"use client";

import { useCurrentUser } from "@/entities/user";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { MembersPageSkeleton } from "@/widgets/members";
import { MembersIdleList } from "@/widgets/settings/ui/members-idle-list";
import { MembersIdleSettingsForm } from "@/widgets/settings/ui/members-idle-settings-form";

export default function MembersSettingsPage() {
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) {
    return <MembersPageSkeleton />;
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Members settings"
        subTitle="Manage member access, roles, and tracking preferences"
      />

      <div className="p-2 md:p-6 space-y-4">
        <MembersIdleSettingsForm />
        <MembersIdleList />
      </div>
    </DashboardContainer>
  );
}
