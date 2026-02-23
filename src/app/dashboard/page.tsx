"use client";

import { Link2 } from "lucide-react";
import { useCurrentUser } from "@/entities/user";
import { Card, CardContent } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";
import {
  DashboardPageSkeleton,
  MainDashboardHeader,
  OverviewSection,
  RecentActivityTable,
} from "@/widgets/dashboard";
import { AnalyticsSection } from "@/widgets/dashboard/ui/analytics-section";
import { DashboardSectionHeader } from "@/widgets/header";
import { TimeEntriesTable } from "@/widgets/time-entry";

type AppUrlType = {
  id: string;
  name: string;
  hours: number;
  percent: number;
};

const appUrlData: AppUrlType[] = [
  {
    id: "1",
    name: "Chrome",
    hours: 378.58,
    percent: 75,
  },
  {
    id: "2",
    name: "Microsoft® Windows®",
    hours: 90.8,
    percent: 50,
  },
  {
    id: "3",
    name: "chatgpt.com",
    hours: 75.58,
    percent: 25,
  },
  {
    id: "4",
    name: "Microsoft Edge",
    hours: 42.85,
    percent: 10,
  },
  {
    id: "5",
    name: "Yandex",
    hours: 38.9,
    percent: 7,
  },
];

export default function DashboardPage() {
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) {
    return <DashboardPageSkeleton />;
  }

  return (
    <div className="flex overflow-auto bg-background">
      <div className="flex flex-1 flex-col">
        <main className="bg-linear-to-b overflow-y-auto from-primary/5 via-background to-background">
          <MainDashboardHeader />

          <div className="p-2 md:p-6 grid gap-4">
            <OverviewSection />
            <AnalyticsSection isPreview />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <RecentActivityTable />

              <div className="w-full flex flex-col gap-4">
                <DashboardSectionHeader
                  title="Apps & URLs"
                  icon={Link2}
                  link={{
                    label: "View All",
                    href: "/dashboard/admin/summaries/full-reports",
                  }}
                />
                <Card className="overflow-hidden border-border/60 shadow-sm p-0 flex-1">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto w-full">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b bg-muted/30">
                            <th className="px-4 py-3 font-semibold text-muted-foreground text-left whitespace-nowrap">
                              App or site
                            </th>
                            <th className="px-4 py-3 font-semibold text-muted-foreground text-right w-[160px] sm:w-[240px]">
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {appUrlData.map((item) => (
                            <tr
                              key={item.id}
                              className="border-b border-border/50 last:border-0 transition-colors hover:bg-muted/40 group"
                            >
                              <td className="px-4 py-3.5">
                                <span className="font-medium text-foreground">
                                  {item.name}
                                </span>
                              </td>
                              <td className="px-4 py-3.5">
                                <div className="flex items-center justify-end gap-3 w-full">
                                  <span className="font-semibold text-foreground whitespace-nowrap">
                                    {`${item.hours}h`}
                                  </span>
                                  <Progress
                                    className="h-1.5 w-16 sm:w-24 bg-primary/10"
                                    value={item.percent}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <TimeEntriesTable isPreview />
          </div>
        </main>
      </div>
    </div>
  );
}
