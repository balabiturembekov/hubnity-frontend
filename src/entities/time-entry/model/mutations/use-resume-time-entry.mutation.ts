import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { timeEntryService } from "@/entities/time-entry/api/time-entry.service";
import type { TimeEntryEntity } from "@/entities/time-entry/model/time-entry.types";
import { handleError } from "@/shared/lib/utils";

export const useResumeTimeEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<TimeEntryEntity, Error, string>({
    mutationKey: ["resumeTimeEntry"],
    mutationFn: (id: string) => timeEntryService.resumeTimeEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeEntries"] });
      queryClient.invalidateQueries({ queryKey: ["myTimeEntries"] });
      queryClient.invalidateQueries({ queryKey: ["activeTimeEntries"] });
      toast.success("Time entry resumed successfully");
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to resume time entry"));
    },
  });
};

