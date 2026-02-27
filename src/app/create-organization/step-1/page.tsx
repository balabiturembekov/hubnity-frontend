"use client";

import {
  CreateOrganizationStep1Form,
  useCreateOrganizationStore,
} from "@/features/create-organization";
import { CreateOrganizationLayout } from "@/widgets/organization";

export default function CreateOrganizationStep1Page() {
  const isStep1Valid = useCreateOrganizationStore((s) => s.isStep1Valid);

  return (
    <CreateOrganizationLayout currentStep={1} nextLinkDisabled={!isStep1Valid}>
      <CreateOrganizationStep1Form />
    </CreateOrganizationLayout>
  );
}
