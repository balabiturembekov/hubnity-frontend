"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useUser } from "@/entities/user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import { AppsUrlsReport } from "@/widgets/reports";

function FullReportContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isAdmin } = useUser();
  const defaultTab = searchParams?.get("tab") === "me" ? "me" : "all";

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set("tab", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="p-2 md:p-6 space-y-8">
      {isAdmin ? (
        <Tabs defaultValue={defaultTab} onValueChange={handleTabChange}>
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
