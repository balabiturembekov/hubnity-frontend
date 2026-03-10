"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function useRequireOrganization() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId");

  useEffect(() => {
    if (!orgId) {
      router.replace("/create-organization/step-1");
    }
  }, [orgId, router]);

  return {
    isReady: Boolean(orgId),
    orgId,
  };
}
