"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TEAM_SIZES } from "@/entities/organization/consts/team-size";
import { useCreateOrganizationStore } from "@/features/create-organization/model/create-organization.store";
import {
  type CreateOrganizationStep1Values,
  createOrganizationStep1Schema,
} from "@/features/create-organization/model/create-organization-step-1.schema";
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

export const CreateOrganizationStep1Form = () => {
  const step1Data = useCreateOrganizationStore((s) => s.step1);
  const setStep1 = useCreateOrganizationStore((s) => s.setStep1);
  const setStep1Valid = useCreateOrganizationStore((s) => s.setStep1Valid);

  const form = useForm<CreateOrganizationStep1Values>({
    resolver: zodResolver(createOrganizationStep1Schema),
    mode: "onChange",
    defaultValues: {
      name: step1Data?.name ?? "",
      website: step1Data?.website ?? "",
      teamSize: step1Data?.teamSize ?? "",
    },
  });

  const isValid = form.formState.isValid;

  useEffect(() => {
    const subscription = form.watch((value) => {
      setStep1(value as Partial<CreateOrganizationStep1Values>);
    });

    return () => subscription.unsubscribe();
  }, [form.watch, setStep1]);

  useEffect(() => {
    setStep1Valid(isValid);
  }, [isValid, setStep1Valid]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-10 mt-5">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-full">
                <FormLabel aria-required>Organization name</FormLabel>
                <FormControl>
                  <Input required placeholder="Acme Inc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2 w-full">
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://example.com"
                    type="url"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="teamSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel aria-required>Select your team size</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-3 w-full">
                  {TEAM_SIZES.map((size) => (
                    <Button
                      type="button"
                      key={size.value}
                      variant={
                        field.value === size.value ? "default" : "outline"
                      }
                      onClick={() => field.onChange(size.value)}
                      className="w-full"
                    >
                      {size.label}
                    </Button>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
