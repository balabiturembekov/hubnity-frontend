"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { loginFields } from "@/features/auth/consts";
import {
  type LoginFormValues,
  loginSchema,
} from "@/features/auth/model/auth.schema";
import { useLoginMutation } from "@/features/auth/model/mutations/use-login.mutation";
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
import { PasswordInput } from "@/shared/ui/password-input";

export const LoginForm = () => {
  const loginMutation = useLoginMutation();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => loginMutation.mutate(values))}
        className="space-y-5"
      >
        {loginFields.map(
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
                          placeholder={placeholder}
                          className="pl-9 h-10"
                          disabled={loginMutation.isPending}
                          autoComplete={autoComplete}
                          {...field}
                        />
                      ) : (
                        <Input
                          id={name}
                          type={type}
                          placeholder={placeholder}
                          className="pl-9 h-10"
                          disabled={loginMutation.isPending}
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
        <Button
          type="submit"
          className="w-full gap-2"
          disabled={loginMutation.isPending}
          size="lg"
        >
          {loginMutation.isPending ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Logging in...
            </>
          ) : (
            <>
              Log in
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};
