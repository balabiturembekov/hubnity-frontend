import { api } from "@/shared/config/api";
import type { TeamActivityEntity } from "../model/team-activity.types";

class TeamActivityService {
  async getTeamActivity(period: string, userId?: string, projectId?: string) {
    const response = await api.get<TeamActivityEntity>("/team-activity", {
      params: {
        period,
        userId,
        projectId,
      },
    });
    return response.data;
  }
}

export const teamActivityService = new TeamActivityService();
