import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectService } from "@/entities/project";
import { handleError } from "@/shared/lib/utils";

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, { id: string }>({
    mutationKey: ["deleteProject"],
    mutationFn: ({ id }) => projectService.deleteProject(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    onError: (error) => {
      toast.error(handleError(error, "Error while deleting project"));
    },
  });
};
