import { Suspense } from "react";
import { useTabParam } from "@/shared/hooks/useTabParam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { ScreenshotSettings } from "@/widgets/screenshot-settings";
import { AppsURLsSettingsForm } from "@/widgets/settings";
import { MembersList } from "@/widgets/settings/ui/members-list";

const ActivityTrackingTabsContent = () => {
  const defaultTab = "apps-url";
  const { tab, handleTabChange } = useTabParam({ defaultTab });

  return (
    <Tabs
      defaultValue={tab}
      onValueChange={handleTabChange}
      className="min-w-0 w-full"
    >
      <TabsList>
        <TabsTrigger value={defaultTab}>Apps & URLs</TabsTrigger>
        <TabsTrigger value="screenshot">Screenshot</TabsTrigger>
      </TabsList>

      <TabsContent value="screenshot">
        <ScreenshotSettings />
      </TabsContent>

      <TabsContent value={defaultTab} className="space-y-4">
        <AppsURLsSettingsForm />
        <MembersList variant="apps-urls" />
      </TabsContent>
    </Tabs>
  );
};

export const ActivityTrackingTabs = () => {
  return (
    <Suspense>
      <ActivityTrackingTabsContent />
    </Suspense>
  );
};
