import z from "zod";

export const addOrganizationGoalsSchema = z.object({
  goalsIds: z.array(z.string()).min(1, "At least one goal is required"),
});

export type AddOrganizationGoalsValues = z.infer<
  typeof addOrganizationGoalsSchema
>;
