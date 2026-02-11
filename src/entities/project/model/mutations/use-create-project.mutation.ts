import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectService } from "@/entities/project/api/project.service";
import type {
  CreateProjectReq,
  ProjectEntity,
} from "@/entities/project/model/project.types";
import { handleError } from "@/shared/lib/utils";

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ProjectEntity, Error, CreateProjectReq>({
    mutationKey: ["createProject"],
    mutationFn: (payload) => {
      return projectService.createProject(payload);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
    onError: (e) => {
      toast.error(handleError(e));
    },
  });
};
