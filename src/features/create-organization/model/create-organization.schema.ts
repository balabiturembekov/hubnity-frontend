import { z } from "zod";

export const createOrganizationStep1Schema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  website: z.string().optional(),
  teamSize: z.string().min(1, "Please select your team size"),
});

export type CreateOrganizationStep1FormValues = z.infer<
  typeof createOrganizationStep1Schema
>;
