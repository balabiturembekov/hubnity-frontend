import { z } from "zod";
import { TEAM_SIZES } from "@/entities/organization/consts/team-size";

export const createOrganizationStep1Schema = z.object({
  name: z.string().min(1, "Organization name is required"),
  website: z.string().optional(),
  teamSize: z.enum(TEAM_SIZES.map((size) => size.value)),
});

export type CreateOrganizationStep1Values = z.infer<
  typeof createOrganizationStep1Schema
>;
