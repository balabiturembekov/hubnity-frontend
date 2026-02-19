"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import {
  type OrganizationInformationSettingsFormValues,
  organizationInformationSettingsSchema,
} from "@/features/settings";
import { Button } from "@/shared/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/shared/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { Textarea } from "@/shared/ui/textarea";

const industries = [
  "Digital Marketing",
  "E-commerce",
  "Education and training",
  "Freelancing",
  "IT services",
];

export const OrganizationSettingsTab = () => {
  const form = useForm<OrganizationInformationSettingsFormValues>({
    resolver: zodResolver(organizationInformationSettingsSchema),
    defaultValues: {
      name: "",
      industry: "",
      address: "",
      logo: "",
      taxId: "",
      currency: "",
      startWeekOn: "",
      timezone: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => console.log(values))}>
        <div className="grid grid-cols-5 gap-8 my-12">
          {/* Company details section */}
          <div className="col-span-2 flex flex-col gap-2 w-1/2">
            <h2 className="text-xl">Organization profile</h2>
            <p className="font-light text-muted-foreground">
              Manage basic company information
            </p>
          </div>

          <div className="col-span-3 grid grid-cols-4">
            <div className="col-span-3 flex flex-col justify-between gap-3">
              <div className="grid grid-cols-2 items-start gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input id="name" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="industry"
                  render={() => (
                    <FormItem>
                      <FormLabel htmlFor="industry">Industry</FormLabel>
                      <Combobox id="industry" items={industries}>
                        <ComboboxInput className="bg-white" />
                        <ComboboxContent>
                          <ComboboxEmpty>No items found</ComboboxEmpty>
                          <ComboboxList>
                            {(item) => (
                              <ComboboxItem key={item} value={item}>
                                {item}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 items-start">
                <FormField
                  control={form.control}
                  name="taxId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="taxId">Tax ID</FormLabel>
                      <FormControl>
                        <Input id="taxId" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <FormControl>
                        <Textarea id="address" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid-cols-1 place-self-end flex flex-col items-center gap-3">
              <div className="size-32 rounded-full bg-gray-100 flex items-center justify-center">
                <span className="text-muted-foreground text-sm">
                  Pfp placeholder
                </span>
              </div>
              <div className="flex items-center gap-3 justify-between">
                <Button variant="outline" className="font-light">
                  Edit photo
                </Button>
                <Button variant="outline" size="icon">
                  <Trash strokeWidth={1.2} />
                </Button>
              </div>
            </div>
          </div>

          <Separator className="col-span-5" />

          {/* Time zone & preferences section */}
          <div className="col-span-2 flex flex-col gap-2 w-1/2">
            <h2 className="text-xl">Timezone & preferences</h2>
            <p className="font-light text-muted-foreground">
              Manage regional and localization settings
            </p>
          </div>

          <div className="col-span-3 flex gap-3">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="currency">Currency</FormLabel>
                  <FormControl>
                    <Input id="currency" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="startWeekOn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="startWeekOn">Start week on</FormLabel>
                  <FormControl>
                    <Input id="startWeekOn" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="timezone">Timezone</FormLabel>
                  <FormControl>
                    <Input id="timezone" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className="col-span-1 col-start-5 place-self-end flex items-center gap-3">
            <Button type="button" size="lg" variant="outline" className="w-24">
              Cancel
            </Button>
            <Button type="submit" size="lg" className="w-24">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
