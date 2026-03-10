import z from "zod";

export const createOrganizationStep2Schema = z.object({
  goalsIds: z.array(z.string()).min(1, "At least one goal is required"),
});

export type CreateOrganizationStep2Values = z.infer<
  typeof createOrganizationStep2Schema
>;
