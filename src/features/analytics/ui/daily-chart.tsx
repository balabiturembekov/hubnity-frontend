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
import { useMediaQuery } from "usehooks-ts";
import { useDailyData } from "@/features/analytics/hooks/use-daily-data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { GraphSkeleton } from "@/widgets/skeleton";

export function DailyChart() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const { dailyData, isPending } = useDailyData(isMobile ? 7 : 14);

  if (isPending) {
    return <GraphSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Daily Hours</CardTitle>
        <CardDescription>
          Hours tracked over the last {isMobile ? 7 : 14} days
        </CardDescription>
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
              tickFormatter={(v) =>
                `${dailyData.find((d) => d.date === v)?.fullDate}`
              }
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
                name === "hours" ? "Active" : "Idle",
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
              dataKey="idleHours"
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
