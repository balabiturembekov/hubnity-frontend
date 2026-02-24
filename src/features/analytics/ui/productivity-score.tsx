"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

const mockTrendData = [
  { day: "Mon", score: 72 },
  { day: "Tue", score: 75 },
  { day: "Wed", score: 68 },
  { day: "Thu", score: 82 },
  { day: "Fri", score: 85 },
  { day: "Sat", score: 60 },
  { day: "Sun", score: 81 },
];

export function ProductivityScore() {
  const currentScore = 81;
  const trend = 4.2;
  const isPositive = trend > 0;

  const productivePct = (6.2 / 8) * 100;
  const neutralPct = (1.3 / 8) * 100;
  const unproductivePct = (0.5 / 8) * 100;

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Productivity Score</CardTitle>
            <CardDescription>Based on activity & apps</CardDescription>
          </div>
          <div
            className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
              isPositive
                ? "bg-emerald-500/10 text-emerald-500"
                : "bg-rose-500/10 text-rose-500"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            {Math.abs(trend)}%
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[1fr_2fr] gap-4 items-center mb-6">
          <div className="flex flex-col">
            <span className="text-5xl font-bold tracking-tight text-emerald-500">
              {currentScore}%
            </span>
            <span className="text-xs text-muted-foreground mt-1">
              vs last week
            </span>
          </div>

          <div className="h-[60px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide />
                <Tooltip
                  cursor={{
                    stroke: "var(--muted-foreground)",
                    strokeWidth: 1,
                    strokeDasharray: "3 3",
                  }}
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    fontSize: 12,
                  }}
                  formatter={(value: number | undefined) => [
                    `${value ?? 0}%`,
                    "Score",
                  ]}
                  labelFormatter={(label) => `Day: ${label}`}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#10b981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorScore)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex text-xs justify-between text-muted-foreground mb-1">
            <span>Time Breakdown (8h total)</span>
          </div>
          <div className="h-2.5 w-full flex rounded-full overflow-hidden bg-muted">
            <div
              className="bg-emerald-500 h-full transition-all group relative"
              style={{ width: `${productivePct}%` }}
            />
            <div
              className="bg-slate-400 dark:bg-slate-600 h-full transition-all group relative"
              style={{ width: `${neutralPct}%` }}
            />
            <div
              className="bg-rose-500 h-full transition-all group relative"
              style={{ width: `${unproductivePct}%` }}
            />
          </div>
          <div className="flex text-[10px] justify-between text-muted-foreground pt-1 px-1">
            <div className="flex items-center gap-1.5 cursor-help">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Productive (78%)</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-help">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600" />
              <span>Neutral (16%)</span>
            </div>
            <div className="flex items-center gap-1.5 cursor-help">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Unproductive (6%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
