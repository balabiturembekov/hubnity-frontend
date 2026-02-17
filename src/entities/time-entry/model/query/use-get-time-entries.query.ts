import { useQuery } from "@tanstack/react-query";
import { timeEntryService } from "@/entities/time-entry/api/time-entry.service";
import type {
  getTimeEntriesParams,
  TimeEntryEntity,
} from "@/entities/time-entry/model/time-entry.types";

export const useGetTimeEntriesQuery = (params?: getTimeEntriesParams) =>
  useQuery<TimeEntryEntity[], Error>({
    queryKey: ["timeEntries", params],
    queryFn: () => timeEntryService.getTimeEntries(params),
  });
