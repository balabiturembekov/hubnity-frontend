"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGetOrganizationId } from "@/shared/hooks/use-get-organization-id";
import { useGetMyOrganizationsQuery } from "../model/queries/use-get-my-organizations.query";

const ORG_ID_KEY = "orgId";

export const useOrganizationGuard = () => {
  const router = useRouter();
  const orgId = useGetOrganizationId();

  const {
    data: organizations,
    isPending,
    isError,
  } = useGetMyOrganizationsQuery();

  const [resolvedOrgId, setResolvedOrgId] = useState<string | null>(null);

  const isValidating = isPending || (!resolvedOrgId && !isError);

  useEffect(() => {
    if (isPending || !organizations) return;

    // No organizations → go to welcome
    if (organizations.length === 0) {
      localStorage.removeItem(ORG_ID_KEY);
      router.replace("/welcome");
      return;
    }

    const orgIds = new Set(organizations.map((o) => o.id));

    // 1. Check URL orgId
    if (orgId && orgIds.has(orgId)) {
      localStorage.setItem(ORG_ID_KEY, orgId);
      setResolvedOrgId(orgId);
      return;
    }

    // 2. Check localStorage orgId
    const savedOrgId = localStorage.getItem(ORG_ID_KEY);
    if (savedOrgId && orgIds.has(savedOrgId)) {
      setResolvedOrgId(savedOrgId);
      router.replace(`/dashboard/${savedOrgId}`);
      return;
    }

    // 3. Fallback to first organization
    const firstOrgId = organizations[0].id;
    localStorage.setItem(ORG_ID_KEY, firstOrgId);
    setResolvedOrgId(firstOrgId);
    router.replace(`/dashboard/${firstOrgId}`);
  }, [isPending, organizations, orgId, router]);

  return {
    orgId: resolvedOrgId,
    organizations: organizations ?? [],
    isPending: isValidating,
  };
};
