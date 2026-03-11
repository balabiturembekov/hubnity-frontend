"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  type CreateOrganizationValues,
  createOrganizationSchema,
  useCreateOrganizationMutation,
} from "@/entities/organization";
import { TEAM_SIZES } from "@/entities/organization/consts/team-size";
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
  const router = useRouter();

  const form = useForm<CreateOrganizationValues>({
    resolver: zodResolver(createOrganizationSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      domain: "",
      teamSize: "",
    },
  });

  const { mutate: createOrganization, isPending } =
    useCreateOrganizationMutation();

  const onSubmit = (data: CreateOrganizationValues) => {
    createOrganization(data, {
      onSuccess: (data) => {
        router.replace(`/create-organization/step-2?orgId=${data.id}`);
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-10 h-full"
      >
        <div className="flex flex-1 flex-col gap-10">
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
              name="domain"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2 w-full">
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Input placeholder="example.com" {...field} />
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
        </div>
        <footer className="w-full flex items-center justify-between fixed lg:static bottom-0 left-0 bg-gray-100 lg:bg-background py-3 lg:py-0 px-5 sm:px-10 lg:px-0 shadow-[0_-1px_3px_0_#0000001a] lg:shadow-none">
          <Button
            size="lg"
            className="h-10 text-sm ml-auto"
            disabled={!form.formState.isValid || isPending}
          >
            Next step
            <ArrowRight className="ml-2 h-5 w-5" strokeWidth={2.5} />
          </Button>
        </footer>
      </form>
    </Form>
  );
};
