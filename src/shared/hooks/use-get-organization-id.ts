"use client";

import { useParams } from "next/navigation";

export const useGetOrganizationId = () => {
  const params = useParams<{ orgId?: string }>();
  const orgId = params?.orgId ?? "";

  return orgId;
};
