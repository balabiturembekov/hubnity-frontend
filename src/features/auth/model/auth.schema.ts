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
