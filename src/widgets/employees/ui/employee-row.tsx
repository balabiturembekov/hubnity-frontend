import { UserAvatar, useUserStore } from "@/entities/user";
import type { UserEntity } from "@/entities/user/model/user.types";
import {
  DeleteEmployeeDialog,
  UpdateEmployeeDialog,
} from "@/features/employees";
import { Badge } from "@/shared/ui/badge";
import { TableCell, TableRow } from "@/shared/ui/table";

interface EmployeeRowProps {
  user: UserEntity;
}

export const EmployeeRow = ({ user }: EmployeeRowProps) => {
  const { user: currentUser } = useUserStore();

  return (
    <TableRow key={user.id} className="transition-colors hover:bg-muted/50">
      <TableCell>
        <div className="flex items-center gap-3">
          <UserAvatar name={user.name} avatar={user.avatar} size="md" />
          <div>
            <div className="font-medium">{user.name}</div>
            {user.id === currentUser?.id && (
              <span className="text-xs text-muted-foreground">(You)</span>
            )}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <span className="text-sm">{user.email}</span>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            user.role === "ADMIN" ||
            user.role === "OWNER" ||
            user.role === "SUPER_ADMIN"
              ? "default"
              : "secondary"
          }
        >
          {user.role}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={user.status === "ACTIVE" ? "default" : "outline"}
          className={
            user.status === "ACTIVE"
              ? "bg-green-500/10 text-green-700 hover:bg-green-500/20 border-green-500/20"
              : ""
          }
        >
          {user.status}
        </Badge>
      </TableCell>
      <TableCell>
        {user.hourlyRate ? (
          <span className="font-medium">${user.hourlyRate}/hr</span>
        ) : (
          <span className="text-muted-foreground">-</span>
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <UpdateEmployeeDialog user={user} />
          <DeleteEmployeeDialog employee={user} />
        </div>
      </TableCell>
    </TableRow>
  );
};
