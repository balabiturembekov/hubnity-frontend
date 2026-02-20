"use client";

import { useCurrentUser } from "@/entities/user";
import { AdminGuard } from "@/features/auth";
import {
  CreateEmployeeDialog,
  EmployeesFilterForm,
} from "@/features/employees";
import { TooltipProvider } from "@/shared/ui/tooltip";
import {
  EmployeesPageSkeleton,
  EmployeesStats,
  EmployeesTable,
} from "@/widgets/employees";
import { DashboardPageHeader } from "@/widgets/header/ui/dashboard-page-header";

export default function EmployeesPage() {
  const { data, isPending } = useCurrentUser();

  if (isPending || !data) {
    return <EmployeesPageSkeleton />;
  }

  return (
    <AdminGuard>
      <TooltipProvider>
        <div className="flex h-screen overflow-auto bg-background">
          <div className="flex flex-1 flex-col">
            <main className="flex-1 overflow-y-auto">
              <div className="bg-linear-to-b from-primary/5 via-background to-background">
                <DashboardPageHeader
                  title="Employees"
                  subTitle="Manage your team members and their roles"
                >
                  <CreateEmployeeDialog />
                </DashboardPageHeader>

                <div className="p-2 md:p-6 grid gap-4">
                  <EmployeesStats />
                  <EmployeesFilterForm />
                  <EmployeesTable />
                </div>
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </AdminGuard>
  );
}
