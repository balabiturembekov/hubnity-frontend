import z from "zod";
import { memberRoles, memberStatuses } from "../organization.types";

export const updateMemberSchema = z.object({
  role: z.enum(memberRoles),
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

export type UpdateMemberValues = z.infer<typeof updateMemberSchema>;
