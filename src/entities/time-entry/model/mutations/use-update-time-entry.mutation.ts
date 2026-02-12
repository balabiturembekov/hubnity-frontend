import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { timeEntryService } from "@/entities/time-entry/api/time-entry.service";
import type {
  TimeEntryEntity,
  UpdateTimeEntryReq,
} from "@/entities/time-entry/model/time-entry.types";
import { handleError } from "@/shared/lib/utils";

interface UpdateTimeEntryParams {
  id: string;
  data: UpdateTimeEntryReq;
}

export const useUpdateTimeEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<TimeEntryEntity, Error, UpdateTimeEntryParams>({
    mutationKey: ["updateTimeEntry"],
    mutationFn: ({ id, data }) => timeEntryService.updateTimeEntry(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeEntries"] });
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to update time entry"));
    },
  });
};
