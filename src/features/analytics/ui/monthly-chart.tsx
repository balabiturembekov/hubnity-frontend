"use client";

import { format, getDaysInMonth, parseISO } from "date-fns";
import { useMemo } from "react";
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
import { useGetAnalyticsHoursByDayRes } from "@/entities/dashboard-analytics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Skeleton } from "@/shared/ui/skeleton";

interface MonthlyChartPoint {
  day: number;
  date: string;
  fullDate: string;
  hours: number;
}

export const MonthlyChart = () => {
  const { data: monthlyData, isPending } = useGetAnalyticsHoursByDayRes({
    period: "this_month",
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
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Monthly Hours</CardTitle>
          <CardDescription>
            Total hours worked per day in {format(now, "MMMM yyyy")}
          </CardDescription>
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
        <CardTitle>Monthly Hours</CardTitle>
        <CardDescription>
          Total hours worked per day in {format(now, "MMMM yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis width={"auto"} />
            <Tooltip
              formatter={(value: number | undefined) => [
                `${Number(value ?? 0).toFixed(2)} h`,
                "Hours",
              ]}
              labelFormatter={(_, payload) =>
                payload?.[0]?.payload?.fullDate ?? ""
              }
            />
            <Legend />
            <Bar dataKey="hours" fill="#00c951" name="Hours" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
