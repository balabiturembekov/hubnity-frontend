"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerFields } from "@/features/auth/consts";
import {
  type RegisterFormValues,
  registerSchema,
} from "@/features/auth/model/auth.schema";
import { useRegisterMutation } from "@/features/auth/model/mutations/use-register.mutation";
import { Button } from "@/shared/ui/button";
import { Checkbox } from "@/shared/ui/checkbox";
import { Field, FieldLabel } from "@/shared/ui/field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { PasswordInput } from "@/shared/ui/password-input";

export const RegisterForm = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const registerMutation = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          registerMutation.mutate(values),
        )}
        className="space-y-5"
      >
        <div className="flex flex-col gap-5">
          {registerFields.map(
            ({
              name,
              label,
              placeholder,
              type = "text",
              required,
              icon: Icon,
              bottomMessage,
              autoComplete,
            }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor={name} aria-required={required}>
                      {label}
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                        {type === "password" ? (
                          <PasswordInput
                            id={name}
                            type={type}
                            required={required}
                            placeholder={placeholder}
                            className="pl-9 h-10"
                            disabled={registerMutation.isPending}
                            autoComplete={autoComplete}
                            {...field}
                          />
                        ) : (
                          <Input
                            id={name}
                            type={type}
                            required={required}
                            placeholder={placeholder}
                            className="pl-9 h-10"
                            disabled={registerMutation.isPending}
                            autoComplete={autoComplete}
                            {...field}
                          />
                        )}
                      </div>
                    </FormControl>
                    {bottomMessage && (
                      <span className="text-xs text-muted-foreground">
                        {bottomMessage}
                      </span>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            ),
          )}
        </div>

        <Field orientation="horizontal" className="gap-2">
          <Checkbox
            checked={termsAccepted}
            onCheckedChange={() => setTermsAccepted((prev) => !prev)}
            id="accept-terms"
            required
          />
          <FieldLabel
            htmlFor="accept-terms"
            className="gap-1 items-end leading-2"
          >
            I agree to the
            <Link href="/privacy" className="font-medium hover:underline">
              Privacy Policy
            </Link>
          </FieldLabel>
        </Field>

        <Button
          type="submit"
          className="w-full gap-2"
          disabled={registerMutation.isPending}
          size="lg"
        >
          {registerMutation.isPending ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Creating account...
            </>
          ) : (
            <>
              Create account
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
