"use client";

import { Controller } from "react-hook-form";
import type {
  ProjectEntity,
  ProjectStatusType,
} from "@/entities/project/model/project.types";
import { colors } from "@/features/project/consts";
import { useProjectForm } from "@/features/project/hooks/use-project-form";
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
import { Textarea } from "@/shared/ui/textarea";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: "create" | "update";
  project?: ProjectEntity;
}

export const ProjectDialog = ({
  open,
  onOpenChange,
  variant = "create",
  project,
}: ProjectDialogProps) => {
  const isCreate = variant === "create";
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    handleClose,
    control,
  } = useProjectForm({ open, onOpenChange, variant, project });

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>{isCreate ? "Create" : "Edit"} Project</DialogTitle>
            <DialogDescription>
              {isCreate
                ? "Add a new project to the system"
                : "Update project information"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Project Name</Label>
              <Input
                id="name"
                {...register("name")}
                required
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-xs text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                rows={3}
                disabled={isPending}
              />
              {errors.description && (
                <p className="text-xs text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                {...register("clientName")}
                disabled={isPending}
              />
              {errors.clientName && (
                <p className="text-xs text-destructive">
                  {errors.clientName.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value}
                      onValueChange={(value: ProjectStatusType) =>
                        field.onChange(value)
                      }
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="ARCHIVED">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="color">Color</Label>
                <Controller
                  name="color"
                  control={control}
                  render={({ field }) => (
                    <Select
                      value={field.value || "#3b82f6"}
                      onValueChange={(value) => field.onChange(value)}
                      disabled={isPending}
                    >
                      <SelectTrigger>
                        <SelectValue>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: field.value }}
                            />
                            {colors.find((c) => c.value === field.value)?.label}
                          </div>
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color.value} value={color.value}>
                            <div className="flex items-center gap-2">
                              <div
                                className="h-4 w-4 rounded-full"
                                style={{ backgroundColor: color.value }}
                              />
                              {color.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="budget">Budget ($)</Label>
              <Input
                id="budget"
                type="number"
                step="0.01"
                {...register("budget")}
                disabled={isPending}
              />
              {errors.budget && (
                <p className="text-xs text-destructive">
                  {errors.budget.message}
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
              {isPending ? "Saving..." : isCreate ? "Create" : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
