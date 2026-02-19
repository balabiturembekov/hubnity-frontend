"use client";

import { ChartPie } from "lucide-react";
import { Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useMediaQuery } from "usehooks-ts";
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
import { EmptyState } from "@/widgets/empty-state";
import { GraphSkeleton } from "@/widgets/skeleton";

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
    return <GraphSkeleton />;
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
              innerRadius={50}
              outerRadius={80}
              paddingAngle={3}
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
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: 12,
                color: "var(--foreground)",
              }}
              formatter={(value?: number, name?: string) => [
                `${value}h`,
                `${name}`,
              ]}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
