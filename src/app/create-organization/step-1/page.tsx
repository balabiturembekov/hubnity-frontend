"use client";

import { CreateOrganizationStep1Form } from "@/features/create-organization";
import { CreateOrganizationLayout } from "@/widgets/organization";

export default function CreateOrganizationStep1Page() {
  return (
    <CreateOrganizationLayout currentStep={1}>
      <CreateOrganizationStep1Form />
    </CreateOrganizationLayout>
  );
}
