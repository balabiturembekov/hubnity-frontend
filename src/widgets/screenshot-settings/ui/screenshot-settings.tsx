"use client";

import { Camera, CameraOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { ScreenshotInterval } from "@/entities/screenshot-settings";
import { useScreenshotSettings } from "@/features/screenshot-settings";
import { handleError } from "@/shared/lib/utils";
import { Card, CardContent } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Switch } from "@/shared/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { intervalOptions } from "@/widgets/screenshot-settings/consts";
import { SettingsSectionDescription } from "@/widgets/settings/ui/settings-section-description";
import { GraphSkeleton } from "@/widgets/skeleton";

export function ScreenshotSettings() {
  const { settings, setEnabled, setInterval, canEdit, isLoading } =
    useScreenshotSettings();
  const [showWarning, setShowWarning] = useState(false);
  const warningTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, []);

  const handleToggle = async (checked: boolean) => {
    if (!canEdit || isLoading) return;

    if (checked) {
      setShowWarning(true);
    } else {
      setShowWarning(false);
    }

    try {
      await setEnabled(checked);
      toast.success(
        `Screenshot capture ${checked ? "enabled" : "disabled"} successfully`,
      );
    } catch (error) {
      console.error("Failed to update screenshot settings:", error);
      toast.error(handleError(error, "Failed to update screenshot settings"));
    }
  };

  const handleIntervalChange = async (value: string) => {
    if (!canEdit || isLoading) return;

    try {
      await setInterval(+value as ScreenshotInterval);
      toast.success("Screenshot interval updated successfully");
    } catch (error) {
      console.error("Failed to update interval:", error);
      toast.error(handleError(error, "Failed to update screenshot interval"));
    }
  };

  if (isLoading) {
    return <GraphSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-3 sm:gap-x-8 xl:grid-cols-5 xl:gap-y-4">
      <SettingsSectionDescription
        title="Screenshot capture"
        subTitle={
          canEdit
            ? "Automatically capture screenshots while tracking time"
            : "Screenshot capture settings are managed by your administrator"
        }
        className="col-span-1 sm:col-span-3 xl:col-span-2"
      />

      <Card className="w-full col-span-1 flex flex-col gap-4 sm:col-span-3 xl:col-span-3 xl:col-start-4">
        <CardContent>
          {showWarning && canEdit && (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> When you start tracking time, your
                browser will ask you to choose what to share:
              </p>
              <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-yellow-800 dark:text-yellow-200">
                <li>
                  <strong>Entire Screen:</strong> Captures your whole screen,
                  even when switching between apps
                </li>
                <li>
                  <strong>Window/Tab:</strong> Only captures the selected window
                  or browser tab
                </li>
              </ul>
              <p className="mt-2 text-sm text-yellow-800 dark:text-yellow-200">
                Your screen will only be captured while the timer is running.
              </p>
            </div>
          )}

          {!canEdit && (
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
              <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                These settings are configured by your administrator. Contact an
                admin to change screenshot capture settings.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-4 rounded-lg border bg-muted/30 p-4 sm:flex-row items-end sm:items-center sm:justify-between">
            <div className="flex min-w-0 flex-1 items-start gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="shrink-0 cursor-help">
                    {settings.screenshotEnabled ? (
                      <Camera className="h-5 w-5 text-green-500" />
                    ) : (
                      <CameraOff className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {settings.screenshotEnabled
                      ? "Screenshot capture is enabled."
                      : "Screenshot capture is disabled. Enable it to capture screenshots while tracking time."}
                  </p>
                </TooltipContent>
              </Tooltip>
              <div className="min-w-0 space-y-0.5">
                <Label htmlFor="screenshot-enabled">Screenshot Capture</Label>
                <p className="text-sm text-muted-foreground">
                  {canEdit
                    ? "Capture screenshots automatically during time tracking"
                    : `Screenshots are ${settings.screenshotEnabled ? "enabled" : "disabled"} for your company`}
                </p>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Switch
                  id="screenshot-enabled"
                  checked={settings.screenshotEnabled}
                  onCheckedChange={canEdit ? handleToggle : undefined}
                  disabled={!canEdit || isLoading}
                  className="shrink-0"
                />
              </TooltipTrigger>
              <TooltipContent>
                {canEdit
                  ? settings.screenshotEnabled
                    ? "Screenshots are enabled"
                    : "Enable automatic screenshot capture"
                  : "Only administrators can change this setting"}
              </TooltipContent>
            </Tooltip>
          </div>

          {settings.screenshotEnabled && (
            <div className="space-y-2 mt-2">
              <Label htmlFor="screenshot-interval">Capture Interval</Label>
              <Select
                value={settings.screenshotInterval.toString()}
                onValueChange={canEdit ? handleIntervalChange : undefined}
                disabled={!canEdit || isLoading}
              >
                <SelectTrigger
                  id="screenshot-interval"
                  className="w-full sm:w-48"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {intervalOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                {canEdit ? (
                  <>
                    Screenshots will be taken at the selected interval while
                    your timer is active.
                    <span className="mt-1 block">
                      <strong>Tip:</strong> Choose &quot;Entire Screen&quot;
                      when prompted to capture screenshots even when switching
                      between applications.
                    </span>
                  </>
                ) : (
                  `Screenshots are captured every ${
                    intervalOptions
                      .find((opt) => opt.value === settings.screenshotInterval)
                      ?.label.toLowerCase() ?? "minute"
                  } while tracking time.`
                )}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
