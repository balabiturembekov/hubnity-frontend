"use client";

import { ChartPie } from "lucide-react";
import { Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import {
  useAnalyticsStore,
  useGetAnalyticsHoursByProjectQuery,
} from "@/entities/dashboard-analytics";
import { formatHours } from "@/shared/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";
import { EmptyState } from "@/widgets/empty-state";

const FALLBACK_COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7c7c",
  "#a78bfa",
  "#34d399",
  "#fbbf24",
  "#f472b6",
];

import { useMediaQuery } from "usehooks-ts";

interface ChartData {
  name: string;
  hours: number;
  fill: string;
}
[];

export const ProjectsChart = () => {
  const { period } = useAnalyticsStore();
  const { data: hoursByProject, isPending: isHoursByProjectPending } =
    useGetAnalyticsHoursByProjectQuery({ period });

  const isDesktop = useMediaQuery("(min-width: 640px)");

  const chartData =
    hoursByProject?.data.map((item, index) => ({
      name: item.projectName,
      hours: item.hours,
      fill:
        item.projectColor || FALLBACK_COLORS[index % FALLBACK_COLORS.length],
    })) ?? [];

  if (isHoursByProjectPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Time by Project</CardTitle>
          <CardDescription>
            Distribution of hours across projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full rounded-full" />
        </CardContent>
      </Card>
    );
  }

  if (!hoursByProject || chartData.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Time by Project</CardTitle>
          <CardDescription>
            Distribution of hours across projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmptyState
            icon={<ChartPie className="h-12 w-12 mx-auto" />}
            title="No project data"
            description="Track time on projects to see the distribution here"
            className="py-8"
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Time by Project</CardTitle>
        <CardDescription>Distribution of hours across projects</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        <ResponsiveContainer
          width="100%"
          height={300}
          className="flex-1 flex flex-col justify-center"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="hours"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={(props) => {
                if (!isDesktop) return "";

                let name = String(props.name ?? "");
                const hours = Number(props.value ?? 0);
                if (name.length > 7) {
                  name = `${name.slice(0, 7)}...`;
                }
                return `${name} (${formatHours(hours * 3600)})`;
              }}
              labelLine={isDesktop}
            />
            <Legend
              formatter={(value, entry) => {
                const payload = entry.payload as ChartData;
                const hours = payload.hours;

                return (
                  <span className="ml-2 text-sm font-medium text-foreground">
                    {value}
                    <span className="ml-2 text-muted-foreground">
                      ({formatHours((hours ?? 0) * 3600)})
                    </span>
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
