import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { timeEntryService } from "@/entities/time-entry/api/time-entry.service";
import { handleError } from "@/shared/lib/utils";

export const useDeleteTimeEntryMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationKey: ["deleteTimeEntry"],
    mutationFn: (id: string) => timeEntryService.deleteTimeEntry(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["timeEntries"] });
      toast.success("Time entry deleted successfully");
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to delete time entry"));
    },
  });
};
