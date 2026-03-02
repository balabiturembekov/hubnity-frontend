"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Button } from "@/shared/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { forgotPasswordFields } from "../consts";
import {
  type ForgotPasswordFormValues,
  forgotPasswordSchema,
} from "../model/auth.schema";
import { useForgotPasswordMutation } from "../model/mutations/use-forgot-password.mutation";

export const ForgotPasswordForm = () => {
  const forgotPasswordMutation = useForgotPasswordMutation();
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          forgotPasswordMutation.mutate(values),
        )}
        className="space-y-5"
      >
        <FormField
          control={form.control}
          name={forgotPasswordFields.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel
                htmlFor={forgotPasswordFields.name}
                aria-required={forgotPasswordFields.required}
              >
                {forgotPasswordFields.label}
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <forgotPasswordFields.icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground z-10" />
                  <Input
                    id={forgotPasswordFields.name}
                    type={forgotPasswordFields.type}
                    placeholder={forgotPasswordFields.placeholder}
                    required
                    className="pl-9 h-10"
                    disabled={forgotPasswordMutation.isPending}
                    autoComplete={forgotPasswordFields.autoComplete}
                    {...field}
                  />
                </div>
              </FormControl>
              {forgotPasswordFields.bottomMessage && (
                <span className="text-xs text-muted-foreground">
                  {forgotPasswordFields.bottomMessage}
                </span>
              )}
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full gap-2"
          disabled={forgotPasswordMutation.isPending}
          size="lg"
        >
          {forgotPasswordMutation.isPending ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Sending...
            </>
          ) : (
            <>
              Send reset link
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
