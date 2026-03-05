import { useQueries } from "@tanstack/react-query";
import { screenshotService } from "../../api/screenshot.service";

interface UseGetScreenshotsByTimeEntriesQueryProps {
  timeEntryIds: string[];
}

export const useGetScreenshotsByTimeEntriesQuery = ({
  timeEntryIds,
}: UseGetScreenshotsByTimeEntriesQueryProps) => {
  return useQueries({
    queries: timeEntryIds.map((timeEntryId) => ({
      queryKey: ["screenshots", timeEntryId],
      queryFn: () =>
        screenshotService.getScreenshotsByTimeEntry({ id: timeEntryId }),
    })),
  });
};
