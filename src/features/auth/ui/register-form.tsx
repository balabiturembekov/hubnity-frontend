"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerFieldGroups } from "@/features/auth/consts";
import {
  type RegisterFormValues,
  registerSchema,
} from "@/features/auth/model/auth.schema";
import { useRegisterMutation } from "@/features/auth/model/mutations/use-register.mutation";
import { cn } from "@/shared/lib/utils";
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

export const RegisterForm = () => {
  const registerMutation = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      companyName: "",
      companyDomain: "",
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
        {registerFieldGroups.map((group) => (
          <div
            key={group.id}
            className={cn(
              "grid gap-5",
              group.columns === 2 && "grid-cols-1 md:grid-cols-2",
            )}
          >
            {group.fields.map(
              ({
                name,
                label,
                placeholder,
                type = "text",
                required,
                icon: Icon,
                bottomMessage,
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
                          <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <Input
                            id={name}
                            type={type}
                            placeholder={placeholder}
                            className="pl-9 h-10"
                            disabled={registerMutation.isPending}
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
          </div>
        ))}

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
