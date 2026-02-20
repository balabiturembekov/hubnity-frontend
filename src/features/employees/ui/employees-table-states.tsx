import { Users } from "lucide-react";
import type { UserEntity } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { TableCell, TableRow } from "@/shared/ui/table";
import { useEmployeesStore } from "../model/employees.store";

interface EmployeesTableStatesProps {
  employees: UserEntity[];
  isError: boolean;
  hasActiveFilters: boolean;
}

export const EmployeesTableStates = ({
  employees,
  isError,
  hasActiveFilters,
}: EmployeesTableStatesProps) => {
  const { resetFilters } = useEmployeesStore();

  if (isError) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="h-64">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-lg font-semibold mb-1">Error</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-[250px]">
              Failed to load employees
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={resetFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </TableCell>
      </TableRow>
    );
  }

  if (!isError && employees.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={6} className="h-64">
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
            <h3 className="text-lg font-semibold mb-1">No employees found</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-[250px]">
              Try adjusting your filters to see more results
            </p>
            <Button variant="outline" onClick={resetFilters}>
              Clear Filters
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return null;
};
