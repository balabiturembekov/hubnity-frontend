import { Users } from "lucide-react";
import {
  EmployeesTableStates,
  useFilteredEmployees,
} from "@/features/employees";
import { Badge } from "@/shared/ui/badge";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { DashboardSectionHeader } from "@/widgets/header";
import { EmployeeRow } from "./employee-row";

export const EmployeesTable = () => {
  const { employees, totalCount, isLoading, isError, hasActiveFilters } =
    useFilteredEmployees();

  return (
    <section className="overflow-y-auto">
      <DashboardSectionHeader
        title="Team Members"
        icon={Users}
        description={
          employees.length === totalCount
            ? "All members in your organization"
            : `Filtered results from ${totalCount} total employees`
        }
      >
        <Badge variant="secondary" className="ml-2">
          {employees.length}
        </Badge>
      </DashboardSectionHeader>

      <div className="rounded-md border mt-4 bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Hourly Rate</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <EmployeesTableStates
              employees={employees}
              isLoading={isLoading}
              isError={isError}
              hasActiveFilters={hasActiveFilters}
            />
            {employees.map((user) => (
              <EmployeeRow key={user.id} user={user} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
