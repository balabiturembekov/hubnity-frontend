import type { OrganizationGoalEntity } from "@/entities/organization-goal";
import { api } from "@/shared/config/api";
import type { OrganizationEntity } from "../model/organization.types";
import type { CreateOrganizationValues } from "../model/schemas/create-organization.schema";

class OrganizationService {
  async createOrganization(payload: CreateOrganizationValues) {
    const res = await api.post<OrganizationEntity>("/organizations", payload);
    return res.data;
  }

  async addOrganizationGoals(orgId: string, payload: string[]) {
    const res = await api.put<OrganizationGoalEntity[]>(
      `/organizations/${orgId}/goals`,
      payload,
    );
    return res.data;
  }
}

export const organizationService = new OrganizationService();
