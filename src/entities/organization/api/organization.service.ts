import type { OrganizationGoalEntity } from "@/entities/organization-goal";
import { api } from "@/shared/config/api";
import type {
  MemberEntity,
  OrganizationEntity,
} from "../model/organization.types";
import type { CreateOrganizationValues } from "../model/schemas/create-organization.schema";

class OrganizationService {
  async createOrganization(payload: CreateOrganizationValues) {
    const res = await api.post<OrganizationEntity>("/organizations", payload);
    return res.data;
  }

  async addOrganizationGoals(orgId: string, payload: string[]) {
    const res = await api.put<OrganizationGoalEntity[]>(
      `/organizations/${orgId}/goals`,
      {
        goalIds: payload,
      },
    );
    return res.data;
  }

  async getMember(orgId: string, memberId: string) {
    const res = await api.get<MemberEntity>(
      `/organizations/${orgId}/members/${memberId}`,
    );
    return res.data;
  }

  async getMembers(orgId: string) {
    const res = await api.get<MemberEntity[]>(
      `/organizations/${orgId}/members`,
    );
    return res.data;
  }

  async getMyOrganizations() {
    const res = await api.get<OrganizationEntity[]>("/organizations");
    return res.data;
  }
}

export const organizationService = new OrganizationService();
