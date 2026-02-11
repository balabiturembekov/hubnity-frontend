import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { projectService } from "@/entities/project/api/project.service";
import type {
  ProjectEntity,
  UpdateProjectReq,
} from "@/entities/project/model/project.types";
import { handleError } from "@/shared/lib/utils";

interface UpdateProjectParams {
  id: string;
  data: UpdateProjectReq;
}

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ProjectEntity, Error, UpdateProjectParams>({
    mutationKey: ["updateProject"],
    mutationFn: ({ id, data }) => {
      return projectService.updateProject(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (e) => {
      toast.error(handleError(e));
    },
  });
};
