import { Lock, Mail, User } from "lucide-react";
import type { HTMLInputAutoCompleteAttribute } from "react";
import type {
  ForgotPasswordFormValues,
  LoginFormValues,
  RegisterFormValues,
  ResetPasswordFormValues,
} from "@/features/auth/model/auth.schema";

type FieldConfig<TValues> = {
  name: keyof TValues;
  label: string;
  placeholder: string;
  type?: string;
  icon: React.ElementType;
  required?: boolean;
  bottomMessage?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
};

export const loginFields: FieldConfig<LoginFormValues>[] = [
  {
    name: "email",
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    icon: Mail,
    required: true,
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    icon: Lock,
    required: true,
    autoComplete: "current-password",
  },
];

export const registerFields: FieldConfig<RegisterFormValues>[] = [
  {
    name: "firstName",
    label: "First name",
    placeholder: "John",
    icon: User,
    required: true,
    autoComplete: "name",
  },
  {
    name: "lastName",
    label: "Last name",
    placeholder: "Doe",
    icon: User,
    required: true,
    autoComplete: "name",
  },
  {
    name: "email",
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    icon: Mail,
    required: true,
    autoComplete: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    icon: Lock,
    required: true,
    autoComplete: "new-password",
  },
];

export const forgotPasswordFields: FieldConfig<ForgotPasswordFormValues> = {
  name: "email",
  label: "Email address",
  placeholder: "you@example.com",
  type: "email",
  icon: Mail,
  required: true,
  autoComplete: "email",
};

export const resetPasswordFields: FieldConfig<ResetPasswordFormValues>[] = [
  {
    name: "newPassword",
    label: "New password",
    placeholder: "Enter password",
    type: "password",
    icon: Lock,
    required: true,
    autoComplete: "new-password",
  },
];
