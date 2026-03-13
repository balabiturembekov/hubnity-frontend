import z from "zod";
import { memberStatuses, newMemberRoles } from "../organization.types";

export const createMemberSchema = z.object({
  email: z.email("Invalid email address"),
  role: z.enum(newMemberRoles),
  status: z.enum(memberStatuses),
  hourlyRate: z.coerce
    .number<number>()
    .min(0, "Hourly rate cannot be negative")
    .max(10000, "Hourly rate cannot exceed $10,000")
    .optional(),
  weeklyLimit: z.preprocess(
    (value) => (value === "" ? undefined : value),
    z.coerce
      .number<number>()
      .positive("Weekly limit must be a positive number")
      .optional(),
  ),
});

export type CreateMemberValues = z.infer<typeof createMemberSchema>;

// TODO: Добавить settings
