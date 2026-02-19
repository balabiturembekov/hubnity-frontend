"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useHourlyData } from "@/features/analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { GraphSkeleton } from "@/widgets/skeleton";

export function HourlyChart() {
  const { hourlyData, isPending } = useHourlyData();

  if (isPending) {
    return <GraphSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Hours by Time of Day</CardTitle>
        <CardDescription>Last 24 hours of activity</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={hourlyData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              dataKey="time"
              tickFormatter={(v) => v}
            />
            <YAxis
              width="auto"
              tick={{ fontSize: 11, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v.toFixed(0)}h`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                fontSize: 12,
                color: "var(--foreground)",
              }}
              formatter={(value?: number) => [
                `${(value ?? 0).toFixed(1)}h`,
                "Hours",
              ]}
            />
            <Area
              type="monotone"
              dataKey="hours"
              stroke="var(--chart-2)"
              fill="var(--chart-2)"
              fillOpacity={0.1}
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
