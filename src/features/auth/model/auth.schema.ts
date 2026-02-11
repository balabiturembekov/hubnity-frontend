import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email().min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm passwords is required"),
    companyName: z.string().min(1, "Company name is required"),
    companyDomain: z
      .string()
      .min(1, "Company domain is required")
      .refine((value) => /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+$/.test(value), {
        message: "Please enter a valid domain (e.g., example.com)",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm passwords is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    path: ["newPassword"],
    message: "New password must be different from current password",
  });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export const changeProfileSchema = z.object({
  name: z.string().optional(),
  email: z.email("Please enter a valid email").optional(),
  hourlyRate: z.coerce
    .number<number>()
    .min(0, "Hourly rate cannot be negative")
    .max(10000, "Hourly rate cannot exceed $10,000")
    .optional(),
  avatar: z.string().optional().nullable(),
});

export type ChangeProfileFormValues = z.infer<typeof changeProfileSchema>;
