"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useGetOrganization } from "@/entities/organization";

export function useRequireOrganization() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId");

  const { data: organization, isError } = useGetOrganization(orgId ?? "", {
    enabled: Boolean(orgId),
    retry: false,
  });

  useEffect(() => {
    if (!orgId || isError) {
      router.replace("/create-organization/step-1");
    }
  }, [isError, orgId, router]);

  return {
    isReady: Boolean(orgId && organization),
    orgId: organization?.id ?? null,
  };
}
