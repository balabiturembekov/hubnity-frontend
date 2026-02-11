import { useQuery } from "@tanstack/react-query";
import { type ProjectEntity, projectService } from "@/entities/project";

export const useGetActiveProjectsQuery = () =>
  useQuery<ProjectEntity[], Error>({
    queryKey: ["active-projects"],
    queryFn: projectService.getActiveProjects,
  });
