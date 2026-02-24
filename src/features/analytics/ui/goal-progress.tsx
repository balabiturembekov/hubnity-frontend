"use client";

import { Target } from "lucide-react";
import { useMyTimeEntries } from "@/entities/time-entry/hooks/use-my-time-entries";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";

export function GoalProgress() {
  const {
    prev1WeekStats,
    prev2WeekStats,
    prev3WeekStats,
    myThisWeekStats,
    myThisMonthStats,
  } = useMyTimeEntries();
  const weeklyGoal = 40;
  const weeklyDone = myThisWeekStats?.totalHours || 0;
  const weeklyPct = Math.min(Math.round((weeklyDone / weeklyGoal) * 100), 100);

  const monthlyGoal = 160;
  const monthlyDone = myThisMonthStats?.totalHours || 0;
  const monthlyPct = Math.min(
    Math.round((monthlyDone / monthlyGoal) * 100),
    100,
  );

  const previousWeeks = [
    {
      label: "1 week ago",
      done: prev1WeekStats?.totalHours || 0,
      goal: 40,
    },
    {
      label: "2 weeks ago",
      done: prev2WeekStats?.totalHours || 0,
      goal: 40,
    },
    {
      label: "3 weeks ago",
      done: prev3WeekStats?.totalHours || 0,
      goal: 40,
    },
  ];

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Goal Progress</CardTitle>
            <CardDescription>Target hours completion</CardDescription>
          </div>
          <div className="flex items-center justify-center p-2 rounded-full bg-primary/10 text-primary">
            <Target className="h-4 w-4" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 justify-center space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Weekly Goal</span>
              <span className="text-muted-foreground">
                {weeklyDone} / {weeklyGoal}h
              </span>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ease-in-out ${
                  weeklyPct >= 100 ? "bg-emerald-500" : "bg-primary"
                }`}
                style={{ width: `${weeklyPct}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">
              {weeklyPct}% completed
            </p>
          </div>

          <div className="pb-3 space-y-2.5 border-b">
            {previousWeeks.map((week) => {
              const weekPct = Math.min(
                Math.round((week.done / week.goal) * 100),
                100,
              );
              return (
                <div
                  key={week.label}
                  className="flex items-center gap-2 text-xs"
                >
                  <span className="w-20 text-muted-foreground">
                    {week.label}
                  </span>
                  <div className="h-1.5 flex-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        weekPct >= 100 ? "bg-emerald-500" : "bg-primary/40"
                      }`}
                      style={{ width: `${weekPct}%` }}
                    />
                  </div>
                  <span className="text-right text-muted-foreground w-[60px]">
                    {week.done}h
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Monthly Goal</span>
            <span className="text-muted-foreground">
              {monthlyDone} / {monthlyGoal}h
            </span>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ease-in-out ${
                monthlyPct >= 100 ? "bg-emerald-500" : "bg-primary"
              }`}
              style={{ width: `${monthlyPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground text-right">
            {monthlyPct}% completed
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
