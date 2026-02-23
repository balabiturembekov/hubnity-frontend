import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MonthlyChart } from "@/features/analytics";
import { Button } from "@/shared/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { AppsUrlsTable } from "@/widgets/reports";
import { TimeEntriesTable } from "@/widgets/time-entry";

interface EmployeeTabsProps {
  userId: string;
}

export const EmployeeTabs = ({ userId }: EmployeeTabsProps) => {
  return (
    <Tabs className="min-w-0 w-full" defaultValue="overview">
      <TabsList className="mx-auto sm:mx-0">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
      </TabsList>
      <TabsContent className="min-w-0 w-full space-y-6" value="overview">
        <MonthlyChart userId={userId} />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Apps & URLs</h3>
            <Button variant="link" asChild>
              <Link href="/dashboard/admin/summaries/full-reports">
                View full report <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <AppsUrlsTable isAll={false} limit={5} />
        </div>
      </TabsContent>
      <TabsContent className="min-w-0 w-full" value="sessions">
        <TimeEntriesTable userId={userId} />
      </TabsContent>
      <TabsContent value="screenshots"></TabsContent>
    </Tabs>
  );
};
