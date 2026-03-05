import { Suspense } from "react";
import { MonthlyChart } from "@/features/analytics";
import { useTabParam } from "@/shared/hooks/useTabParam";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { AppsUrlsTable } from "@/widgets/reports";
import { TimeEntriesTable } from "@/widgets/time-entry";

interface EmployeeTabsProps {
  userId: string;
}

const EmployeeTabsContent = ({ userId }: EmployeeTabsProps) => {
  const defaultTab = "overview";
  const { tab, handleTabChange } = useTabParam({ defaultTab });

  return (
    <Tabs
      className="min-w-0 w-full"
      defaultValue={tab}
      onValueChange={handleTabChange}
    >
      <TabsList className="mx-auto sm:mx-0">
        <TabsTrigger value={defaultTab}>Overview</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="screenshots">Screenshots</TabsTrigger>
      </TabsList>
      <TabsContent className="min-w-0 w-full space-y-6" value={defaultTab}>
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

export const EmployeeTabs = ({ userId }: EmployeeTabsProps) => {
  return (
    <Suspense>
      <EmployeeTabsContent userId={userId} />
    </Suspense>
  );
};
