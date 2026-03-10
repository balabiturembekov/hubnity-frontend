"use client";

import { Suspense } from "react";
import {
  CreateOrganizationStep2Form,
  useRequireOrganization,
} from "@/features/create-organization";
import { CreateOrganizationLayout } from "@/widgets/organization";

const CreateOrganizationStep2PageContent = () => {
  const { isReady } = useRequireOrganization();

  if (!isReady) return null;

  return (
    <CreateOrganizationLayout currentStep={2}>
      <CreateOrganizationStep2Form />
    </CreateOrganizationLayout>
  );
};

export default function CreateOrganizationStep2Page() {
  return (
    <Suspense>
      <CreateOrganizationStep2PageContent />
    </Suspense>
  );
}
