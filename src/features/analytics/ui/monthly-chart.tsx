"use client";

import { format, getDaysInMonth, parseISO } from "date-fns";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAnalyticsHoursByDayRes } from "@/entities/dashboard-analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { GraphSkeleton } from "@/widgets/skeleton";

interface MonthlyChartPoint {
  day: number;
  date: string;
  fullDate: string;
  hours: number;
}

interface MonthlyChartProps {
  userId?: string;
}

export const MonthlyChart = ({ userId }: MonthlyChartProps) => {
  const { data: monthlyData, isPending } = useGetAnalyticsHoursByDayRes({
    period: "this_month",
    userId,
  });
  const now = new Date();

  const chartData = useMemo<MonthlyChartPoint[]>(() => {
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = getDaysInMonth(now);
    const hoursByDate = new Map(
      (monthlyData?.data ?? []).map((d) => [d.date, d.hours]),
    );

    return Array.from({ length: daysInMonth }, (_, i) => {
      const day = i + 1;
      const date = new Date(year, month, day);
      const dateStr = format(date, "yyyy-MM-dd");
      const hours = hoursByDate.get(dateStr) ?? 0;
      return {
        day,
        date: dateStr,
        fullDate: format(parseISO(dateStr), "MMM d"),
        hours,
      };
    });
  }, [monthlyData?.data, now]);

  if (isPending) {
    return <GraphSkeleton />;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Monthly Hours</CardTitle>
        <CardDescription>
          Total hours worked per day in {format(now, "MMMM yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: "var(--muted-foreground)" }}
              axisLine={false}
              tickLine={false}
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
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullDate ?? ""
              }
            />
            <Bar
              dataKey="hours"
              fill="var(--chart-2)"
              name="Hours"
              radius={4}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
