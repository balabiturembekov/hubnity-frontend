"use client";

import { useGetCurrentUserQuery } from "@/entities/user";
import {
  CreateEmployeeButton,
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
  const { data, isPending } = useGetCurrentUserQuery();

  if (isPending || !data) {
    return <EmployeesPageSkeleton />;
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Employees"
        subTitle="Manage your team members and their roles"
      >
        <CreateEmployeeButton />
      </DashboardPageHeader>

      <div className="p-2 md:p-6 grid gap-4">
        <EmployeesStats />
        <EmployeesFilterForm />
        <EmployeesTable />
      </div>
    </DashboardContainer>
  );
}
