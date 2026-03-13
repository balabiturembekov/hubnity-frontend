"use client";

import { Upload, X } from "lucide-react";
import { UserAvatar } from "@/entities/user";
import { useChangeProfile } from "@/features/auth/hooks/use-change-profile";
import { AvatarCropDialog } from "@/shared/ui/avatar-crop";
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

interface ProfileEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileEditDialog({
  open,
  onOpenChange,
}: ProfileEditDialogProps) {
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    handleClose,
    currentUser,
    avatarPreview,
    handleAvatarChange,
    handleRemoveAvatar,
    cropDialogOpen,
    setCropDialogOpen,
    imageToCrop,
    handleCropComplete,
  } = useChangeProfile({ open, onOpenChange });

  if (!currentUser) return null;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your profile information like name, email and hourly rate.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <UserAvatar
                name={`${currentUser.user.firstName} ${currentUser.user.lastName}`}
                avatar={avatarPreview}
                size="xl"
              />
              <div className="flex gap-2">
                <Label htmlFor="avatar" className="cursor-pointer">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    asChild
                    disabled={isPending}
                  >
                    <span>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </span>
                  </Button>

                  <Input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="hidden"
                    disabled={isPending}
                  />
                </Label>

                {avatarPreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleRemoveAvatar}
                    disabled={isPending}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>

              <p className="text-xs text-muted-foreground text-center">
                JPG, PNG or GIF. Max size 50MB
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">First name</Label>
              <Input
                id="name"
                {...register("firstName")}
                disabled={isPending}
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-xs text-destructive">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Last name</Label>
              <Input
                id="name"
                {...register("lastName")}
                disabled={isPending}
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-xs text-destructive">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                disabled={isPending}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
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
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>

      <AvatarCropDialog
        open={cropDialogOpen}
        onOpenChange={setCropDialogOpen}
        imageSrc={imageToCrop}
        onCropComplete={handleCropComplete}
      />
    </Dialog>
  );
}
