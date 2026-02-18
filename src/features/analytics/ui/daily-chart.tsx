"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDailyData } from "@/features/analytics/hooks/use-daily-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

export function DailyChart() {
  const { dailyData, isPending } = useDailyData();

  if (isPending) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Daily Hours</CardTitle>
          <CardDescription>Hours tracked over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-75 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily Hours</CardTitle>
        <CardDescription>Hours tracked over the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              width="auto"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}h`}
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
                name === "hours" ? "Idle" : "Active",
              ]}
              labelFormatter={(label) =>
                dailyData.find((d) => d.date === label)?.fullDate || label
              }
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Bar
              dataKey="hours"
              stackId="a"
              fill="#10b981"
              radius={[0, 0, 0, 0]}
              name="Active"
            />
            <Bar
              dataKey="hours"
              stackId="a"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
              name="Idle"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
