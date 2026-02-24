"use client";

import { useCurrentUser } from "@/entities/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { MembersPageSkeleton } from "@/widgets/members";
import { ScreenshotSettings } from "@/widgets/screenshot-settings";
import { AppsURLsSettingsForm } from "@/widgets/settings";
import { MembersList } from "@/widgets/settings/ui/members-list";

export default function ActivityTrackingSettingsPage() {
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) {
    return <MembersPageSkeleton />;
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Activity & Tracking"
        subTitle="Manage member access, roles, and tracking preferences"
      />

      <div className="p-2 md:p-6">
        <Tabs defaultValue="apps-url">
          <TabsList>
            <TabsTrigger value="apps-url">Apps & URLs</TabsTrigger>
            <TabsTrigger value="screenshot">Screenshot</TabsTrigger>
          </TabsList>

          <TabsContent value="screenshot">
            <ScreenshotSettings />
          </TabsContent>

          <TabsContent value="apps-url" className="space-y-4">
            <AppsURLsSettingsForm />
            <MembersList variant="apps-urls" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardContainer>
  );
}
