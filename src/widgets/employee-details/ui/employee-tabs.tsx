import { MonthlyChart } from "@/features/analytics";
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
        <AppsUrlsTable isAll={false} limit={5} isHeader />
      </TabsContent>
      <TabsContent className="min-w-0 w-full" value="sessions">
        <TimeEntriesTable userId={userId} />
      </TabsContent>
      <TabsContent value="screenshots"></TabsContent>
    </Tabs>
  );
};
