import { Edit, Trash2, Users } from "lucide-react";
import {
  UserAvatar,
  useGetEmployeesQuery,
  useUserStore,
} from "@/entities/user";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
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
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { useFilteredEmployees } from "../hooks/use-filtered-employees";

export const EmployeesTable = () => {
  const { user: currentUser } = useUserStore();
  const { employees, isLoading, hasActiveFilters } = useFilteredEmployees();
  const { data: users, isLoading: isLoadingUsers } = useGetEmployeesQuery();

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
          {employees.length === users?.length
            ? "All employees in your organization"
            : `Filtered results from ${users?.length} total employees`}
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
              {(isLoading || isLoadingUsers) &&
              (!users || users.length === 0) ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-8"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                      <p>Loading employees...</p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-64">
                    <div className="flex flex-col items-center justify-center p-8 text-center">
                      <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-20" />
                      <h3 className="text-lg font-semibold mb-1">
                        {hasActiveFilters
                          ? "No employees found"
                          : "No employees yet"}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 max-w-[250px]">
                        {hasActiveFilters
                          ? "Try adjusting your filters to see more results"
                          : "Add your first team member to get started"}
                      </p>
                      <Button
                        variant="outline"
                        // onClick={hasActiveFilters ? resetFilters : handleCreate}
                      >
                        {hasActiveFilters ? "Clear Filters" : "Add Employee"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((user) => (
                  <TableRow
                    key={user.id}
                    className="transition-colors hover:bg-muted/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <UserAvatar
                          name={user.name}
                          avatar={user.avatar}
                          size="md"
                        />
                        <div>
                          <div className="font-medium">{user.name}</div>
                          {user.id === currentUser?.id && (
                            <span className="text-xs text-muted-foreground">
                              (You)
                            </span>
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
                          user.role === "admin" ||
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
                        variant={
                          user.status === "ACTIVE" ? "default" : "outline"
                        }
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
                        <span className="font-medium">
                          ${user.hourlyRate}/hr
                        </span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              // onClick={() => handleEdit(user)}
                            >
                              <Edit className="size-4.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit employee</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              // onClick={() => handleDeleteClick(user)}
                              disabled={user.id === currentUser?.id}
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="size-4.5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            {user.id === currentUser?.id
                              ? "Cannot delete yourself"
                              : "Delete employee"}
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
