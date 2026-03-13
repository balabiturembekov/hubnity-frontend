"use client";

import { Controller } from "react-hook-form";
import type { MemberEntity, MemberStatus } from "@/entities/organization";
import { memberStatuses, newMemberRoles } from "@/entities/organization";
import { UserAvatar, useGetCurrentUserQuery } from "@/entities/user";
import { capitalize, cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { useEmployeeForm } from "../hooks/use-employee-form";

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employee?: MemberEntity | null;
}

export function EmployeeDialog({
  open,
  onOpenChange,
  employee,
}: UserDialogProps) {
  const { data: currentUser } = useGetCurrentUserQuery();

  const { form, onSubmit, isPending, handleClose } = useEmployeeForm({
    open,
    onOpenChange,
    variant: employee ? "update" : "create",
    employee: employee || undefined,
  });

  const {
    register,
    control,
    formState: { errors },
  } = form;

  const isSelf = employee?.user.id === currentUser?.id;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] max-h-[85vh] overflow-y-auto">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>{employee ? "Edit User" : "Create User"}</DialogTitle>
            <DialogDescription>
              {employee
                ? "Update user information"
                : "Add a new user to the system"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              {employee && (
                <UserAvatar
                  name={`${employee.user.firstName} ${employee.user.lastName}`}
                  avatar={employee.user.avatar}
                  size="xl"
                />
              )}
            </div>

            {!employee && (
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter user email"
                  {...register("email")}
                  disabled={isPending}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">
                    {errors.email.message}
                  </p>
                )}
              </div>
            )}

            <div
              className={cn("grid grid-cols-2 gap-4", isSelf && "grid-cols-1")}
            >
              {!isSelf && (
                <div className="grid gap-2">
                  <Label htmlFor="role">Role</Label>
                  <Controller
                    control={control}
                    name="role"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isPending}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          {newMemberRoles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {capitalize(role)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.role && (
                    <p className="text-xs text-destructive">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  control={control}
                  name="status"
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(val) =>
                        field.onChange(val as MemberStatus)
                      }
                      disabled={isPending}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {memberStatuses.map((status) => (
                          <SelectItem key={status} value={status}>
                            {capitalize(status)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.status && (
                  <p className="text-xs text-destructive">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="hourlyRate">Hourly Rate ($)</Label>
              <Input
                id="hourlyRate"
                type="number"
                step="0.01"
                placeholder="e.g. 25"
                {...register("hourlyRate")}
                disabled={isPending}
              />
              {errors.hourlyRate && (
                <p className="text-xs text-destructive">
                  {errors.hourlyRate.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="weeklyLimit">Weekly Limit (hours)</Label>
              <Input
                id="weeklyLimit"
                type="number"
                step="0.5"
                placeholder="e.g. 40"
                {...register("weeklyLimit")}
                disabled={isPending}
              />
              {errors.weeklyLimit && (
                <p className="text-xs text-destructive">
                  {errors.weeklyLimit.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : employee ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
