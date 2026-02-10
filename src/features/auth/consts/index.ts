import { Building2, Globe, Lock, Mail, User } from "lucide-react";
import type {
  LoginFormValues,
  RegisterFormValues,
} from "@/features/auth/model/auth.schema";

type FieldConfig<TValues> = {
  name: keyof TValues;
  label: string;
  placeholder: string;
  type?: string;
  icon: React.ElementType;
  required?: boolean;
  bottomMessage?: string;
};

type FieldGroup<TValues> = {
  id: string;
  columns?: number;
  fields: FieldConfig<TValues>[];
};

export const loginFields: FieldConfig<LoginFormValues>[] = [
  {
    name: "email",
    label: "Email address",
    placeholder: "you@example.com",
    type: "email",
    icon: Mail,
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    icon: Lock,
    required: true,
  },
];

export const registerFieldGroups: FieldGroup<RegisterFormValues>[] = [
  {
    id: "1",
    fields: [
      {
        name: "name",
        label: "Full name",
        placeholder: "John Doe",
        icon: User,
        required: true,
      },
      {
        name: "email",
        label: "Email address",
        placeholder: "you@example.com",
        type: "email",
        icon: Mail,
        required: true,
      },
      {
        name: "companyName",
        label: "Company name",
        placeholder: "Acme Inc.",
        icon: Building2,
        required: true,
      },
      {
        name: "companyDomain",
        label: "Company domain",
        placeholder: "mycompany.com",
        icon: Globe,
        bottomMessage: "Optional: Your company domain for branding",
      },
    ],
  },
  {
    id: "2",
    columns: 2,
    fields: [
      {
        name: "password",
        label: "Password",
        placeholder: "Enter password",
        type: "password",
        icon: Lock,
        required: true,
      },
      {
        name: "confirmPassword",
        label: "Confirm password",
        placeholder: "Repeat password",
        type: "password",
        icon: Lock,
        required: true,
      },
    ],
  },
];
