import z from "zod";
import { firstUsersRoles } from "../invitation.types";

export const addFirstUsersSchema = z.object({
  invitations: z.array(
    z.object({
      email: z
        .string()
        .trim()
        .refine(
          (v) => v === "" || z.email().safeParse(v).success,
          "Invalid email",
        ),
      role: z.enum(firstUsersRoles),
    }),
  ),
});

export type AddFirstUsersValues = z.infer<typeof addFirstUsersSchema>;
