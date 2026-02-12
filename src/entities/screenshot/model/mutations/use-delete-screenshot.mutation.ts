import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { screenshotService } from "@/entities/screenshot/api/screenshot.service";
import { handleError } from "@/shared/lib/utils";

export const useDeleteScreenshotMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationKey: ["deleteScreenshot"],
    mutationFn: (id: string) => screenshotService.deleteScreenshot(id),
    onSuccess: (_) => {
      toast.success("Screenshot deleted successfully");
      return queryClient.invalidateQueries({ queryKey: ["screenshots"] });
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to delete screenshot"));
    },
  });
};
