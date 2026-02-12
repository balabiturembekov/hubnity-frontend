import { z } from "zod";
import { employeeSchema } from "./employees.schema";

export const createEmployeeSchema = employeeSchema.extend({
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must not exceed 128 characters"),
});

export type CreateEmployeeSchemaValues = z.infer<typeof createEmployeeSchema>;
