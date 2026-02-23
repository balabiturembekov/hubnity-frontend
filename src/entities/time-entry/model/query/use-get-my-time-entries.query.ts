import { useQuery } from "@tanstack/react-query";
import { timeEntryService } from "@/entities/time-entry/api/time-entry.service";
import type { TimeEntryEntity } from "@/entities/time-entry/model/time-entry.types";

export const useGetMyTimeEntriesQuery = () =>
  useQuery<TimeEntryEntity[], Error>({
    queryKey: ["myTimeEntries"],
    queryFn: () => timeEntryService.getMyTimeEntries(),
  });
