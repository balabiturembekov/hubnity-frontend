"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCreateOrganizationStore } from "@/features/create-organization/model/create-organization.store";

const STEP_1_PATH = "/create-organization/step-1";

/**
 * Redirects to step 1 if step 1 is not complete. Use on step-2 and step-3 pages
 * so users cannot reach later steps without valid step 1 data.
 * @returns isStep1Complete - true when user is allowed to stay on this step (don't render children until true to avoid flash before redirect)
 */
export function useRequireStep1Complete() {
  const router = useRouter();
  const step1 = useCreateOrganizationStore((s) => s.step1);
  const isStep1Valid = useCreateOrganizationStore((s) => s.isStep1Valid);

  const hasOrganizationName = Boolean(step1?.organizationName?.trim());
  const hasTeamSize = Boolean(step1?.teamSize?.trim());
  const isStep1Complete = isStep1Valid && hasOrganizationName && hasTeamSize;

  useEffect(() => {
    if (!isStep1Complete) {
      router.replace(STEP_1_PATH);
    }
  }, [isStep1Complete, router]);

  return { isStep1Complete };
}
