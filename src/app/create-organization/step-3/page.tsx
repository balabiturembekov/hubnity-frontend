"use client";

import { useRequireStep1Complete } from "@/features/create-organization";
import { CreateOrganizationLayout } from "@/widgets/organization";

export default function CreateOrganizationStep3Page() {
  const { isStep1Complete } = useRequireStep1Complete();

  if (!isStep1Complete) {
    return null;
  }

  return (
    <CreateOrganizationLayout currentStep={3}>
      <div>Step 3</div>
    </CreateOrganizationLayout>
  );
}
