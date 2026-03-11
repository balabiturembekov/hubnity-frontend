"use client";

import { Suspense } from "react";
import { useOrganizationRole } from "@/entities/organization";
import { useTabParam } from "@/shared/hooks/useTabParam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { AppsUrlsReport } from "@/widgets/reports";

function FullReportContent() {
  const { isAdmin } = useOrganizationRole();
  const defaultTab = "all";
  const { tab, handleTabChange } = useTabParam({ defaultTab });

  return (
    <div className="p-2 md:p-6 space-y-8">
      {isAdmin ? (
        <Tabs defaultValue={tab} onValueChange={handleTabChange}>
          <TabsList className="w-32">
            <TabsTrigger value="me">Me</TabsTrigger>
            <TabsTrigger value={defaultTab}>All</TabsTrigger>
          </TabsList>

          <TabsContent value={defaultTab}>
            <AppsUrlsReport />
          </TabsContent>
          <TabsContent value="me">
            <AppsUrlsReport isAll={false} />
          </TabsContent>
        </Tabs>
      ) : (
        <AppsUrlsReport isAll={false} />
      )}
    </div>
  );
}

export default function FullReportPage() {
  return (
    <DashboardContainer>
      <Suspense fallback={<div className="p-6">Loading...</div>}>
        <DashboardPageHeader
          title="Apps & URLs report"
          subTitle="Analyze application and website usage across your team"
        />
        <FullReportContent />
      </Suspense>
    </DashboardContainer>
  );
}
