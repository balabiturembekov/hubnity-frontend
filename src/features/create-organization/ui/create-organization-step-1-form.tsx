"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { CREATE_ORGANIZATION_TEAM_SIZES } from "@/features/create-organization/consts";
import {
  type CreateOrganizationStep1FormValues,
  createOrganizationStep1Schema,
} from "@/features/create-organization/model/create-organization.schema";
import { useCreateOrganizationStore } from "@/features/create-organization/model/create-organization.store";
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

  const form = useForm<CreateOrganizationStep1FormValues>({
    resolver: zodResolver(createOrganizationStep1Schema),
    mode: "onChange",
    defaultValues: {
      organizationName: step1Data?.organizationName ?? "",
      website: step1Data?.website ?? "",
      teamSize: step1Data?.teamSize ?? "",
    },
  });

  const watched = form.watch();
  const prevValuesRef = useRef<string>("");
  const prevValidRef = useRef<boolean | null>(null);

  useEffect(() => {
    const next = JSON.stringify(watched);
    if (next !== prevValuesRef.current) {
      prevValuesRef.current = next;
      setStep1(watched);
    }
  }, [watched, setStep1]);

  useEffect(() => {
    const valid = form.formState.isValid;
    if (valid !== prevValidRef.current) {
      prevValidRef.current = valid;
      setStep1Valid(valid);
    }
  }, [form.formState.isValid, setStep1Valid]);

  return (
    <Form {...form}>
      <form className="flex flex-col gap-10 mt-5">
        <div className="flex items-center gap-8">
          <FormField
            control={form.control}
            name="organizationName"
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
            <FormItem className="flex flex-col gap-2">
              <FormLabel aria-required>Select your team size</FormLabel>
              <FormControl>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-3 w-full">
                  {CREATE_ORGANIZATION_TEAM_SIZES.map((size) => (
                    <Button
                      type="button"
                      key={size}
                      variant={field.value === size ? "default" : "outline"}
                      onClick={() => field.onChange(size)}
                      className="w-36"
                    >
                      {size}
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
