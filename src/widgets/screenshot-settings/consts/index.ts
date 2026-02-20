import type { ScreenshotInterval } from "@/entities/screenshot-settings";

export const intervalOptions: { value: ScreenshotInterval; label: string }[] = [
  { value: 300, label: "Every 5 minutes" },
  { value: 600, label: "Every 10 minutes" },
  { value: 900, label: "Every 15 minutes" },
];
