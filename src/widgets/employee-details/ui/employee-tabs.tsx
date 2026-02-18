import { MonthlyChart } from "@/features/analytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { TimeEntriesTable } from "@/widgets/time-entry";

interface EmployeeTabsProps {
  userId: string;
}

export const EmployeeTabs = ({ userId }: EmployeeTabsProps) => {
  return (
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <MonthlyChart userId={userId} />
      </TabsContent>
      <TabsContent value="sessions">
        <TimeEntriesTable userId={userId} />
      </TabsContent>
      <TabsContent value="screenshots"></TabsContent>
    </Tabs>
  );
};
