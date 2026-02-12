import { Users } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { useFilteredEmployees } from "../hooks/use-filtered-employees";
import { EmployeeRow } from "./employee-row";
import { EmployeesTableStates } from "./employees-table-states";

export const EmployeesTable = () => {
  const { employees, totalCount, isLoading, isError, hasActiveFilters } =
    useFilteredEmployees();

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <CardTitle>Team Members</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {employees.length}
          </Badge>
        </div>
        <CardDescription>
          {employees.length === totalCount
            ? "All employees in your organization"
            : `Filtered results from ${totalCount} total employees`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
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
      </CardContent>
    </Card>
  );
};
