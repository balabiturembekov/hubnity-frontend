"use client";

import { useOrganizationGuard } from "../hooks/use-organization-guard";

interface OrganizationGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const OrganizationGuard = ({
  children,
  fallback,
}: OrganizationGuardProps) => {
  const { isPending, orgId } = useOrganizationGuard();

  if (isPending || !orgId) {
    return (
      fallback ?? (
        <div className="flex h-screen items-center justify-center bg-background">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      )
    );
  }

  return <>{children}</>;
};
