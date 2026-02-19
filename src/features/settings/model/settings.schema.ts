import { z } from "zod";

export const organizationInformationSettingsSchema = z.object({
  name: z.string(),
  industry: z.string(),
  address: z.string(),
  logo: z.string(),
  taxId: z.string(),
  currency: z.string(),
  startWeekOn: z.string(),
  timezone: z.string(),
});

export type OrganizationInformationSettingsFormValues = z.infer<
  typeof organizationInformationSettingsSchema
>;
