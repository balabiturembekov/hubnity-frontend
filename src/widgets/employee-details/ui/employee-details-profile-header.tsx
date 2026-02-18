import { format } from "date-fns";
import { UserAvatar, type UserEntity } from "@/entities/user";
import {
  DeleteEmployeeDialog,
  UpdateEmployeeDialog,
} from "@/features/employees";
import { cn } from "@/shared/lib/utils";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardTitle } from "@/shared/ui/card";

interface EmployeeDetailsProfileHeaderProps {
  userDetails: UserEntity;
}

export const EmployeeDetailsProfileHeader = ({
  userDetails,
}: EmployeeDetailsProfileHeaderProps) => {
  return (
    <Card>
      <CardContent className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <UserAvatar size="xl" name={userDetails.name} />
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <CardTitle className="text-2xl">{userDetails.name}</CardTitle>
              <Badge>{userDetails.role}</Badge>
              <Badge
                variant="ghost"
                className={cn("bg-green-100 text-green-600")}
              >
                {userDetails.status}
              </Badge>
            </div>
            <span className="text-muted-foreground">{userDetails.email}</span>
            <span className="text-muted-foreground text-xs">
              Joined {format(userDetails.createdAt, "dd/MM/yyyy")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <UpdateEmployeeDialog user={userDetails} variant="outline" />
          <DeleteEmployeeDialog employee={userDetails} />
        </div>
      </CardContent>
    </Card>
  );
};
