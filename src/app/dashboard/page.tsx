"use client";

import { ArrowRight, Link2 } from "lucide-react";
import Link from "next/link";
import { useCurrentUser } from "@/entities/user";
import { formatDurationFull } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
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

              <div className="w-full space-y-4">
                <DashboardSectionHeader title="Apps & URLs" icon={Link2} />
                <Card>
                  <CardContent className="flex flex-col">
                    <table className="w-full">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="w-120 pb-4 font-medium">
                            App or site
                          </th>
                          <th className="pb-4 font-medium">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appUrlData.map((item) => (
                          <tr key={item.id} className="border-b">
                            <td className="w-120 py-4 text-sm">{item.name}</td>
                            <td className="flex items-center gap-3 py-4 text-sm">
                              <span>
                                {formatDurationFull(item.hours * 3600)}
                              </span>
                              <Progress
                                className="h-1 w-32"
                                value={item.percent}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Button
                      variant="link"
                      className="group w-fit self-center"
                      asChild
                    >
                      <Link href="/dashboard/admin/summaries/full-reports">
                        <span>View All</span>
                        <ArrowRight
                          size={20}
                          className="group-hover:translate-x-1 transition-transform"
                        />
                      </Link>
                    </Button>
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
