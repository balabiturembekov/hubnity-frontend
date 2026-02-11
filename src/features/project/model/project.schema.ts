import { z } from "zod";
import { projectStatuses } from "@/entities/project";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .max(255, { error: "Client name must not be exceed 250 characters" }),
  description: z
    .string()
    .max(1000, { error: "Description must not be exceed 1000 characters" }),
  color: z
    .string()
    .regex(
      /^#[0-9A-Fa-f]{6}$/,
      "Color must be a valid hex color (e.g., #3b82f6)",
    ),
  clientName: z.string().min(1, "Client name is required"),
  budget: z.coerce
    .number<number>({ error: "Budget must be a valid number" })
    .min(0, "Budget can not be negative"),
  status: z.enum(projectStatuses),
});

export type CreateProjectValues = z.infer<typeof createProjectSchema>;
