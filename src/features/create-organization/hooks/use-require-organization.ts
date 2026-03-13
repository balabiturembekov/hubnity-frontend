"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { useGetOrganizationQuery } from "@/entities/organization";

const TERMINAL_STATUSES = new Set([400, 403, 404]);

function getStatus(error: unknown): number | null {
  if (axios.isAxiosError(error)) return error.response?.status ?? null;
  return null;
}

function isTerminalOrgError(error: unknown): boolean {
  const status = getStatus(error);
  return status !== null && TERMINAL_STATUSES.has(status);
}

function isTransientError(error: unknown): boolean {
  const status = getStatus(error);

  if (status === null) return true;

  return status >= 500 || status === 429 || status === 408;
}

export function useRequireOrganization() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId");

  const {
    data: organization,
    isError,
    isLoading,
    error,
  } = useGetOrganizationQuery(orgId ?? "", {
    enabled: Boolean(orgId),
    retry: (failureCount, err) => isTransientError(err) && failureCount < 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 8000),
    refetchOnReconnect: true,
  });

  const shouldRedirect = useMemo(() => {
    if (!orgId) return true;
    if (!isError) return false;
    return isTerminalOrgError(error);
  }, [orgId, isError, error]);

  useEffect(() => {
    if (shouldRedirect) {
      router.replace("/create-organization/step-1");
    }
  }, [shouldRedirect, router]);

  return {
    isReady: Boolean(orgId && organization),
    isLoading,
    orgId: organization?.id ?? null,
  };
}
