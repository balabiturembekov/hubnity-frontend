"use client";

import { Suspense } from "react";
import { useTabParam } from "@/shared/hooks/useTabParam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { AppsUrlsTable } from "@/widgets/reports";
import { RecentActivity } from "./recent-activity";

const ProfileTabsContent = () => {
  const defaultTab = "activity";
  const { tab, handleTabChange } = useTabParam({ defaultTab });

  return (
    <Tabs
      defaultValue={tab}
      onValueChange={handleTabChange}
      className="col-span-2"
    >
      <TabsList>
        <TabsTrigger value={defaultTab}>Activity</TabsTrigger>
        <TabsTrigger value="apps-url">Apps & URLs</TabsTrigger>
        <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
      </TabsList>
      <TabsContent value={defaultTab}>
        <RecentActivity />
      </TabsContent>
      <TabsContent value="apps-url">
        <AppsUrlsTable isAll={false} limit={5} isHeader tab="me" />
      </TabsContent>
      <TabsContent value="screenshots"></TabsContent>
    </Tabs>
  );
};

export const ProfileTabs = () => {
  return (
    <Suspense>
      <ProfileTabsContent />
    </Suspense>
  );
};
