"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { organizationService } from "@/entities/organization/api/organization.service";

export default function DashboardRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    const redirect = async () => {
      try {
        const orgs = await organizationService.getMyOrganizations();

        if (orgs.length === 0) {
          router.replace("/welcome");
          return;
        }

        const savedOrgId = localStorage.getItem("orgId");
        const validSaved =
          savedOrgId && orgs.some((o) => o.id === savedOrgId);

        if (validSaved) {
          router.replace(`/dashboard/${savedOrgId}`);
        } else {
          localStorage.setItem("orgId", orgs[0].id);
          router.replace(`/dashboard/${orgs[0].id}`);
        }
      } catch {
        router.replace("/welcome");
      }
    };

    redirect();
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  );
}
