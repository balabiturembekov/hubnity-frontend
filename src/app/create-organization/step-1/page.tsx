"use client";

import {
  CreateOrganizationStep1Form,
  useCreateOrganizationStore,
} from "@/features/create-organization";
import { CreateOrganizationLayout } from "@/widgets/organization";

export default function CreateOrganizationStep1Page() {
  const isStep1Valid = useCreateOrganizationStore((s) => s.isStep1Valid);
  const step1 = useCreateOrganizationStore((s) => s.step1);
  const hasOrganizationName = Boolean(step1?.organizationName?.trim());

  return (
    <CreateOrganizationLayout
      currentStep={1}
      nextLinkDisabled={!isStep1Valid || !hasOrganizationName}
    >
      <CreateOrganizationStep1Form />
    </CreateOrganizationLayout>
  );
}
