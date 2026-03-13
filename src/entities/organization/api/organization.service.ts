import type { OrganizationGoalEntity } from "@/entities/organization-goal";
import { api } from "@/shared/config/api";
import type {
  MemberEntity,
  OrganizationEntity,
} from "../model/organization.types";
import type { CreateMemberValues } from "../model/schemas/create-member.schema";
import type { CreateOrganizationValues } from "../model/schemas/create-organization.schema";
import type { UpdateMemberValues } from "../model/schemas/update-member.schema";

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

  async getCurrentUser(orgId: string) {
    const res = await api.get<MemberEntity>(
      `/organizations/${orgId}/members/me`,
    );
    return res.data;
  }

  async getGoals(orgId: string) {
    const res = await api.get<OrganizationGoalEntity[]>(
      `/organizations/${orgId}/goals`,
    );
    return res.data;
  }

  async getMyOrganizations() {
    const res = await api.get<OrganizationEntity[]>("/organizations");
    return res.data;
  }

  async getOrganization(orgId: string) {
    const res = await api.get<OrganizationEntity>(`/organizations/${orgId}`);
    return res.data;
  }

  async createMember(orgId: string, payload: CreateMemberValues) {
    const res = await api.post<MemberEntity>(
      `/organizations/${orgId}/members`,
      payload,
    );
    return res.data;
  }

  async updateMember(
    orgId: string,
    memberId: string,
    payload: UpdateMemberValues,
  ) {
    const res = await api.put<MemberEntity>(
      `/organizations/${orgId}/members/${memberId}`,
      payload,
    );
    return res.data;
  }

  async deleteMember(orgId: string, memberId: string) {
    await api.delete(`/organizations/${orgId}/members/${memberId}`);
  }
}

export const organizationService = new OrganizationService();
