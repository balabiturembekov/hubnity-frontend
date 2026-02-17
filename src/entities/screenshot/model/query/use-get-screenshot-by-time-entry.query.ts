import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { screenshotService } from "@/entities/screenshot/api/screenshot.service";
import type {
  GetScreenshotsParams,
  ScreenshotEntity,
} from "@/entities/screenshot/model/screenshot.types";

export const useScreenshotsByTimeEntryQuery = (
  timeEntryId: string,
  params?: GetScreenshotsParams,
  options?: Omit<
    UseQueryOptions<ScreenshotEntity[], Error>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery<ScreenshotEntity[], Error>({
    queryKey: ["screenshots", "timeEntry", timeEntryId, params],
    queryFn: () =>
      screenshotService.getScreenshotsByTimeEntry({ id: timeEntryId }, params),
    enabled: !!timeEntryId && timeEntryId.trim() !== "",
    ...options,
  });
