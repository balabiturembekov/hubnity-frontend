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
import { formatHours } from "@/shared/lib/utils";
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
      <Card>
        <CardHeader>
          <CardTitle>Daily Hours</CardTitle>
          <CardDescription>Hours tracked over the last 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
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
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip
              formatter={(value) => {
                const seconds = value ? +value * 3600 : 0;
                return [`${formatHours(seconds)}h`, "Hours"];
              }}
              labelFormatter={(label) =>
                dailyData.find((d) => d.date === label)?.fullDate || label
              }
            />
            <Legend />
            <Bar dataKey="hours" fill="#3b82f6" name="Hours" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
