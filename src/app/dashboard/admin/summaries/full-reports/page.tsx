"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { AppsUrlsReport } from "@/widgets/reports";

export default function FullReportPage() {
  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Apps & URLs report"
        subTitle="Analyze application and website usage across your team"
      />

      <div className="p-2 md:p-6 space-y-8">
        <Tabs defaultValue="all">
          <TabsList className="w-32">
            <TabsTrigger value="me">Me</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <AppsUrlsReport />
          </TabsContent>
          <TabsContent value="me">
            <AppsUrlsReport isAll={false} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardContainer>
  );
}
