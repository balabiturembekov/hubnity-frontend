"use client";

import { useRequireStep1Complete } from "@/features/create-organization";
import { MonitoringSetups } from "@/widgets/create-organization";
import { CreateOrganizationLayout } from "@/widgets/organization";

export default function CreateOrganizationStep2Page() {
  const { isStep1Complete } = useRequireStep1Complete();

  if (!isStep1Complete) {
    return null;
  }

  return (
    <CreateOrganizationLayout currentStep={2}>
      <MonitoringSetups />
    </CreateOrganizationLayout>
  );
}
