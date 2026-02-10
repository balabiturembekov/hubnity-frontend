"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProfileMutation, useUserStore } from "@/entities/user";
import { handleError } from "@/shared/lib/utils";
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
  type ChangePasswordFormValues,
  changePasswordSchema,
} from "../model/auth.schema";

interface ChangePasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ChangePasswordDialog({
  open,
  onOpenChange,
}: ChangePasswordDialogProps) {
  const { user } = useUserStore();
  const { mutateAsync, isPending } = useUpdateProfileMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  if (!user) return null;

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      await mutateAsync({
        password: data.newPassword,
      });

      toast.success("Password changed successfully");
      onOpenChange(false);
    } catch (error) {
      console.error(handleError(error, "Failed to change password"));
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your new password. Make sure it's at least 8 characters
              long.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                {...register("currentPassword")}
                disabled={isPending}
                placeholder="Enter current password"
                className={errors.currentPassword ? "border-destructive" : ""}
              />
              {errors.currentPassword && (
                <p className="text-xs text-destructive">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                {...register("newPassword")}
                disabled={isPending}
                placeholder="Enter new password (min 8 characters)"
                className={errors.newPassword ? "border-destructive" : ""}
              />
              {errors.newPassword && (
                <p className="text-xs text-destructive">
                  {errors.newPassword.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                disabled={isPending}
                placeholder="Confirm new password"
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Changing..." : "Change Password"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
