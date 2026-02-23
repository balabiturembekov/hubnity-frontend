"use client";

import { useCurrentUser } from "@/entities/user";
import { Card, CardContent } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { MembersPageSkeleton } from "@/widgets/members";
import { ScreenshotSettings } from "@/widgets/screenshot-settings";
import { MembersList } from "@/widgets/settings/ui/members-list";
import { SettingsSectionDescription } from "@/widgets/settings/ui/settings-section-description";

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
            <Card>
              <CardContent>
                <div className="grid grid-cols-3 xl:grid-cols-5 gap-y-4 gap-x-8 my-3">
                  <SettingsSectionDescription
                    title="Track apps & URLs"
                    subTitle="Control whether the names of apps used and the URLs visited are tracked when using Hubnity Desktop app"
                    className="col-span-3"
                  />

                  <div className="col-span-3 xl:col-span-2 xl:col-start-4 place-self-end flex flex-col sm:flex-row items-end gap-3 w-full xl:w-full">
                    <Tabs defaultValue="apps-url" className="w-full">
                      <TabsList className="w-full">
                        <TabsTrigger value="off">Off</TabsTrigger>
                        <TabsTrigger value="apps">Apps</TabsTrigger>
                        <TabsTrigger value="apps-url">Apps & URLs</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </div>
              </CardContent>
            </Card>

            <MembersList variant="apps-urls" />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardContainer>
  );
}
