import { z } from "zod";
import { TEAM_SIZES } from "@/entities/organization/consts/team-size";

export const createOrganizationSchema = z.object({
  name: z.string().min(1, "Organization name is required"),
  domain: z.string().optional(),
  teamSize: z.enum(TEAM_SIZES.map((size) => size.value)),
});

export type CreateOrganizationValues = z.infer<typeof createOrganizationSchema>;
