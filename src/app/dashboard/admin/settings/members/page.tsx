"use client";

import { useCurrentUser } from "@/entities/user";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { MembersPageSkeleton } from "@/widgets/members";
import { MembersIdleSettingsForm } from "@/widgets/settings/ui/members-idle-settings-form";
import { MembersList } from "@/widgets/settings/ui/members-list";

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
        <MembersList />
      </div>
    </DashboardContainer>
  );
}
