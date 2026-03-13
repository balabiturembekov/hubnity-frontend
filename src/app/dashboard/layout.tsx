"use client";

import { OrganizationGuard } from "@/entities/organization";
import { DashboardSidebar, MobileBottomNav } from "@/widgets/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <OrganizationGuard>
      <div className="flex h-screen overflow-hidden bg-background min-w-0">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col min-w-0">
          {children}
          <MobileBottomNav />
        </div>
      </div>
    </OrganizationGuard>
  );
}
