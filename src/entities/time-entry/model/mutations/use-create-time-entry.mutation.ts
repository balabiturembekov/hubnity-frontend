import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { timeEntryService } from "@/entities/time-entry/api/time-entry.service";
import type {
  CreateTimeEntryReq,
  TimeEntryEntity,
} from "@/entities/time-entry/model/time-entry.types";
import { handleError } from "@/shared/lib/utils";

export const useCreateTimeEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<TimeEntryEntity, Error, CreateTimeEntryReq>({
    mutationKey: ["createTimeEntry"],
    mutationFn: (data: CreateTimeEntryReq) =>
      timeEntryService.createTimeEntry(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeEntries"] });
      queryClient.invalidateQueries({ queryKey: ["myTimeEntries"] });
      queryClient.invalidateQueries({ queryKey: ["activeTimeEntries"] });
      toast.success("Time entry started successfully");
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to start time entry"));
    },
  });
};
