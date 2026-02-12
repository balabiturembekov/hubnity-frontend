import type { ScreenshotInterval } from "@/entities/screenshot-settings";

export const intervalOptions: { value: ScreenshotInterval; label: string }[] = [
  { value: 30, label: "Every 30 seconds" },
  { value: 60, label: "Every 1 minute" },
  { value: 300, label: "Every 5 minutes" },
  { value: 600, label: "Every 10 minutes" },
];
