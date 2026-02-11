import { useQuery } from "@tanstack/react-query";
import { type ProjectEntity, projectService } from "@/entities/project";

export const useGetProjectsQuery = () =>
  useQuery<ProjectEntity[], Error>({
    queryKey: ["projects"],
    queryFn: projectService.getProjects,
  });
