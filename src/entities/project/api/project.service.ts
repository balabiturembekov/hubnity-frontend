import type {
  CreateProjectReq,
  ProjectEntity,
  UpdateProjectReq,
} from "@/entities/project/model/project.types";
import { api } from "@/shared/config/api";

class ProjectService {
  async getProjects() {
    const res = await api<ProjectEntity[]>("/projects");
    return res.data;
  }

  async getActiveProjects() {
    const res = await api<ProjectEntity[]>("/projects/active");
    return res.data;
  }

  async getProjectDetails(id: string) {
    const res = await api<ProjectEntity>(`/projects/${id}`);
    return res.data;
  }

  async createProject(payload: CreateProjectReq) {
    const res = await api.post<ProjectEntity>(`/projects`, payload);
    return res.data;
  }

  async updateProject(id: string, payload: UpdateProjectReq) {
    const res = await api.patch<ProjectEntity>(`/projects/${id}`, payload);
    return res.data;
  }

  async deleteProject(id: string) {
    await api.delete(`/projects/${id}`);
  }
}
export const projectService = new ProjectService();
