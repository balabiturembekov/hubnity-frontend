"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  type SecurityLoginSettingsFormValues,
  securityLoginSettingsSchema,
} from "@/features/settings";
import { Card, CardContent } from "@/shared/ui/card";
import { Form } from "@/shared/ui/form";
import { Switch } from "@/shared/ui/switch";
import { SettingsSectionDescription } from "@/widgets/settings/ui/settings-section-description";

export const SecurityLoginTabContent = () => {
  const form = useForm<SecurityLoginSettingsFormValues>({
    resolver: zodResolver(securityLoginSettingsSchema),
    defaultValues: {
      twoFactor: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => console.log(values))}>
        <div className="grid grid-cols-5 gap-8 my-12">
          <SettingsSectionDescription
            title="Two-factor authentication"
            subTitle="Add extra login security"
          />

          <div className="col-span-3">
            <Card className="p-3">
              <CardContent className="flex items-center gap-10 px-1">
                <div className="flex flex-col">
                  <h3 className="text-sm text-muted-foreground font-semibold">
                    Enable Two-factor authentication
                  </h3>
                  <p className="text-muted-foreground font-light text-xs">
                    Two-factor authentication adds an extra security layer by
                    requiring users to enter a verification code from their
                    phone when signing in from an unfamiliar device.
                  </p>
                </div>
                <Switch />
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
};
