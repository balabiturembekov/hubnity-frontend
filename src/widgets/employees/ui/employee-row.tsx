import Link from "next/link";
import type { MemberEntity } from "@/entities/organization";
import { UserAvatar, useGetCurrentUserQuery } from "@/entities/user";
import {
  DeleteEmployeeButton,
  UpdateEmployeeButton,
} from "@/features/employees";
import { useGetOrganizationId } from "@/shared/hooks/use-get-organization-id";
import { buildOrgHref } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { TableCell, TableRow } from "@/shared/ui/table";

interface EmployeeRowProps {
  employee: MemberEntity;
}

export const EmployeeRow = ({ employee }: EmployeeRowProps) => {
  const { data: currentUser } = useGetCurrentUserQuery();
  const orgId = useGetOrganizationId();

  const userLink = buildOrgHref(orgId, `/admin/employees/${employee.id}`);

  return (
    <TableRow key={employee.id} className="transition-colors hover:bg-muted/50">
      <TableCell>
        <div className="flex items-center gap-3">
          <UserAvatar
            name={`${employee.user.firstName} ${employee.user.lastName}`}
            avatar={employee.user.avatar}
            size="md"
          />
          <div>
            <Button variant="link" asChild>
              <Link className="font-medium" href={userLink}>
                {`${employee.user.firstName} ${employee.user.lastName}`}
              </Link>
            </Button>
            {employee.user.id === currentUser?.id && (
              <span className="text-xs text-muted-foreground">(You)</span>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">{employee.user.email}</span>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            ["OWNER", "ADMIN"].includes(employee.role) ? "default" : "secondary"
          }
        >
          {employee.role}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={employee.status === "ACTIVE" ? "default" : "outline"}
          className={
            employee.status === "ACTIVE"
              ? "bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20"
              : ""
          }
        >
          {employee.status}
        </Badge>
      </TableCell>
      <TableCell>
        {employee.hourlyRate ? (
          <span className="font-medium">${employee.hourlyRate}/hr</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <UpdateEmployeeButton employee={employee} />
          <DeleteEmployeeButton employee={employee} />
        </div>
      </TableCell>
    </TableRow>
  );
};
