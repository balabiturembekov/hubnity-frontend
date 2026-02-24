"use client";

import { useCurrentUser } from "@/entities/user";
import {
  CreateEmployeeDialog,
  EmployeesFilterForm,
} from "@/features/employees";
import { DashboardContainer } from "@/widgets/dashboard";
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
    <DashboardContainer>
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
    </DashboardContainer>
  );
}
