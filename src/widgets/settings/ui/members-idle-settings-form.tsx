"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  formValuesToIdleSettingsPayload,
  getIdleSettingsQuery,
  IDLE_INTERVAL_OPTIONS,
  type IdleSettingsFormValues,
  idleSettingsSchema,
  idleSettingsToFormValues,
  useUpdateIdleSettingsMutation,
} from "@/features/settings";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
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
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { SettingsSectionDescription } from "@/widgets/settings/ui/settings-section-description";
import { MembersIdleSettingsFormSkeleton } from "@/widgets/skeleton";

const defaultValues: IdleSettingsFormValues = {
  idleDetectionEnabled: false,
  interval: "5 mins",
  customMinutes: 5,
};

export function MembersIdleSettingsForm() {
  const { data, isSuccess, isPending } = getIdleSettingsQuery();
  const updateMutation = useUpdateIdleSettingsMutation();

  const form = useForm<IdleSettingsFormValues>({
    resolver: zodResolver(idleSettingsSchema),
    defaultValues,
  });

  useEffect(() => {
    if (isSuccess && data) {
      form.reset(idleSettingsToFormValues(data));
    }
  }, [data, isSuccess, form]);

  const idleDetectionEnabled = form.watch("idleDetectionEnabled");
  const interval = form.watch("interval");
  const isCustomInterval = interval === "Custom";

  const onSubmit = (values: IdleSettingsFormValues) => {
    updateMutation.mutate(formValuesToIdleSettingsPayload(values));
  };

  if (isPending) {
    return <MembersIdleSettingsFormSkeleton />;
  }

  return (
    <Card>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-3 xl:grid-cols-5 gap-y-4 gap-x-8 my-3">
              <SettingsSectionDescription
                title="General idle settings"
                subTitle="Set the default idle preferences for all members"
              />

              <div className="col-span-3 place-self-end flex flex-col sm:flex-row items-end gap-3">
                <Card className="p-3 w-full sm:w-auto">
                  <CardContent className="flex items-center justify-between gap-10 px-1">
                    <div className="flex flex-col">
                      <h3 className="text-sm text-muted-foreground font-semibold">
                        Enable idle detection
                      </h3>
                    </div>
                    <FormField
                      control={form.control}
                      name="idleDetectionEnabled"
                      render={({ field }) => (
                        <FormItem className="w-fit">
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <div
                  className={cn(
                    "flex items-end gap-3",
                    isCustomInterval && "flex-col sm:flex-row",
                  )}
                >
                  <div className="flex items-end gap-3">
                    <div
                      className={cn(
                        "flex flex-col gap-2 transition-opacity",
                        !idleDetectionEnabled &&
                          "opacity-50 pointer-events-none",
                      )}
                    >
                      <FormLabel htmlFor="interval">Interval</FormLabel>
                      <FormField
                        control={form.control}
                        name="interval"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Combobox
                                value={field.value}
                                onValueChange={(v) =>
                                  field.onChange(v ?? field.value)
                                }
                                id="interval"
                                items={[...IDLE_INTERVAL_OPTIONS]}
                              >
                                <ComboboxInput
                                  className="bg-white"
                                  disabled={!idleDetectionEnabled}
                                />
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
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>

                    {isCustomInterval && (
                      <div
                        className={cn(
                          "flex items-stretch transition-opacity",
                          !idleDetectionEnabled &&
                            "opacity-50 pointer-events-none",
                        )}
                      >
                        <FormField
                          control={form.control}
                          name="customMinutes"
                          render={({ field }) => (
                            <FormItem className="flex items-stretch gap-0 w-18">
                              <FormControl>
                                <Input
                                  type="number"
                                  min={1}
                                  max={120}
                                  className="rounded-r-none w-24"
                                  disabled={!idleDetectionEnabled}
                                  value={field.value ?? ""}
                                  required
                                  onChange={(e) =>
                                    field.onChange(
                                      e.target.valueAsNumber ?? null,
                                    )
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <span className="bg-gray-100 border rounded-r-md flex items-center justify-center px-3">
                          mins
                        </span>
                      </div>
                    )}
                  </div>

                  <Button type="submit" disabled={updateMutation.isPending}>
                    Apply to all
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
