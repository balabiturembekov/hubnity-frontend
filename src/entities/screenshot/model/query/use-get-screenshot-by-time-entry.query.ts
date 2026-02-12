import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { screenshotService } from "@/entities/screenshot/api/screenshot.service";
import type { ScreenshotEntity } from "@/entities/screenshot/model/screenshot.types";

export const useScreenshotsByTimeEntryQuery = (
  timeEntryId: string,
  options?: Omit<
    UseQueryOptions<ScreenshotEntity[], Error>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery<ScreenshotEntity[], Error>({
    queryKey: ["screenshots", "timeEntry", timeEntryId],
    queryFn: () => screenshotService.getScreenshotsByTimeEntry(timeEntryId),
    enabled: !!timeEntryId && timeEntryId.trim() !== "",
    ...options,
  });
