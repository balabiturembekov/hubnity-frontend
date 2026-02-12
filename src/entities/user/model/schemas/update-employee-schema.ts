import { z } from "zod";
import { employeeSchema } from "./employees.schema";

export const updateEmployeeSchema = employeeSchema.extend({
  password: z
    .string()
    .max(128, "Password must not exceed 128 characters")
    .optional()
    .or(z.literal("")),
});

export type UpdateEmployeeSchemaValues = z.infer<typeof updateEmployeeSchema>;
