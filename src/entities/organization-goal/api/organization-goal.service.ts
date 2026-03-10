import { api } from "@/shared/config/api";
import type { OrganizationGoalEntity } from "../model/organization-goal.types";

class OrganizationGoalService {
  async getOrganizationGoals() {
    const res = await api.get<OrganizationGoalEntity[]>("/organization-goals");
    return res.data;
  }
}

export const organizationGoalService = new OrganizationGoalService();
