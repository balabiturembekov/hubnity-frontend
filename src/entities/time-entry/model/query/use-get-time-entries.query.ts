import type { UseQueryOptions } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { timeEntryService } from "@/entities/time-entry/api/time-entry.service";
import type {
  getTimeEntriesParams,
  TimeEntryEntity,
} from "@/entities/time-entry/model/time-entry.types";

export const useGetTimeEntriesQuery = (
  params?: getTimeEntriesParams,
  options?: Omit<
    UseQueryOptions<TimeEntryEntity[], Error>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery<TimeEntryEntity[], Error>({
    queryKey: ["timeEntries", params],
    queryFn: () => timeEntryService.getTimeEntries(params),
    ...options,
  });
