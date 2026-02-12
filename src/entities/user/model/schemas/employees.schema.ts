import { z } from "zod";

export const employeeSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must not exceed 255 characters"),
  email: z
    .email("Invalid email address")
    .max(255, "Email must not exceed 255 characters"),
  role: z.enum(["EMPLOYEE", "ADMIN", "OWNER", "SUPER_ADMIN"]),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  hourlyRate: z.coerce
    .number<number>()
    .min(0, "Hourly rate cannot be negative")
    .max(10000, "Hourly rate cannot exceed $10,000")
    .optional(),
  avatar: z.string().nullable().optional(),
});
