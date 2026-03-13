"use client";

import { Suspense } from "react";
import {
  CreateOrganizationStep3Form,
  useRequireOrganization,
} from "@/features/create-organization";
import { ScreenLoader } from "@/widgets/loader";
import { CreateOrganizationLayout } from "@/widgets/organization";

const CreateOrganizationStep3PageContent = () => {
  const { isReady, isLoading } = useRequireOrganization();

  if (isLoading) {
    return (
      <CreateOrganizationLayout currentStep={3}>
        <ScreenLoader className="h-auto text-primary" size={40} />
      </CreateOrganizationLayout>
    );
  }

  if (!isReady) return null;

  return (
    <CreateOrganizationLayout currentStep={3}>
      <CreateOrganizationStep3Form />
    </CreateOrganizationLayout>
  );
};

export default function CreateOrganizationStep3Page() {
  return (
    <Suspense>
      <CreateOrganizationStep3PageContent />
    </Suspense>
  );
}
