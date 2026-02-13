import { useQuery } from "@tanstack/react-query";
import { timeEntryService } from "@/entities/time-entry";

export const useGetActiveTimeEntriesQuery = () =>
  useQuery({
    queryKey: ["activeTimeEntries"],
    queryFn: timeEntryService.getActiveTimeEntries,
  });
