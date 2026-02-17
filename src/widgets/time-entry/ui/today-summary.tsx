"use client";

import { format } from "date-fns";
import { Clock, Settings } from "lucide-react";
import { useTimeEntry } from "@/features/time-entry";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { ScreenshotSettings } from "@/widgets/screenshot-settings";

export const TodaySummary = () => {
  const { todayHours, todayEntries } = useTimeEntry();

  return (
    <div className="flex items-start gap-6 w-full">
      <Card className="transition-shadow hover:shadow-md w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <CardTitle>Today&apos;s Summary</CardTitle>
          </div>
          <CardDescription>
            {format(new Date(), "EEEE, MMMM d")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-lg bg-primary/5 p-3">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Total Hours
                </p>
                <p className="text-xs text-muted-foreground">Tracked today</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{todayHours}</p>
                <p className="text-xs text-muted-foreground">hours</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div>
                <p className="text-sm font-medium text-foreground">Entries</p>
                <p className="text-xs text-muted-foreground">Time entries</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{todayEntries}</p>
                <p className="text-xs text-muted-foreground">
                  {todayEntries === 1 ? "entry" : "entries"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="transition-shadow hover:shadow-md w-full">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <CardTitle>Screenshot Settings</CardTitle>
          </div>
          <CardDescription>Configure automatic screenshots</CardDescription>
        </CardHeader>
        <CardContent>
          <ScreenshotSettings />
        </CardContent>
      </Card>
    </div>
  );
};
