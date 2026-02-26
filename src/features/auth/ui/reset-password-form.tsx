"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { resetPasswordFields } from "@/features/auth/consts";
import {
  type ResetPasswordFormValues,
  resetPasswordSchema,
} from "@/features/auth/model/auth.schema";
import { useResetPasswordMutation } from "@/features/auth/model/mutations/use-reset-password.mutation";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { PasswordInput } from "@/shared/ui/password-input";

export const ResetPasswordForm = () => {
  const resetPasswordMutation = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
      token: token || "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          resetPasswordMutation.mutate(values),
        )}
        className="space-y-5"
      >
        {resetPasswordFields.map(
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
                      <PasswordInput
                        id={name}
                        type={type}
                        placeholder={placeholder}
                        className="pl-9 h-10"
                        disabled={resetPasswordMutation.isPending}
                        autoComplete={autoComplete}
                        {...field}
                      />
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
        <Button
          type="submit"
          className="w-full gap-2"
          disabled={resetPasswordMutation.isPending}
          size="lg"
        >
          {resetPasswordMutation.isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span>Reset password</span>
          )}
        </Button>
      </form>
    </Form>
  );
};
