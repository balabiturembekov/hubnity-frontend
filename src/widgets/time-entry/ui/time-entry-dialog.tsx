"use client";

import { format } from "date-fns";
import { useGetProjectsQuery } from "@/entities/project";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { useTimeEntryForm } from "@/features/time-entry/hooks/use-time-entry-form";
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

interface TimeEntryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entry: TimeEntryEntity | null;
}

export const TimeEntryDialog = ({
  open,
  onOpenChange,
  entry,
}: TimeEntryDialogProps) => {
  const { data: projects } = useGetProjectsQuery();
  const { register, handleSubmit, errors, isPending, onSubmit } =
    useTimeEntryForm({
      entry,
      open,
      onOpenChange,
    });

  if (!entry) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Time Entry</DialogTitle>
            <DialogDescription>Update time entry details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date & Time</Label>
              <Input
                id="date"
                value={(() => {
                  try {
                    const date = new Date(entry.startTime);
                    if (Number.isNaN(date.getTime())) return "Invalid date";
                    return format(date, "PPp");
                  } catch {
                    return "Invalid date";
                  }
                })()}
                disabled
                className="bg-muted"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project">Project</Label>
              <Select
                defaultValue={entry.projectId || "none"}
                {...register("projectId")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No project</SelectItem>
                  {projects
                    ?.filter((p) => p.status === "ACTIVE")
                    .map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="duration">
                Duration (e.g., "2h 30m", "2.5h", or "150m")
              </Label>
              <Input
                id="duration"
                {...register("duration")}
                placeholder="2h 30m"
                disabled={isPending}
                required
              />
              {errors.duration && (
                <p className="text-xs text-destructive">
                  {errors.duration.message}
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
                placeholder="What did you work on?"
              />
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
            <Button
              type="submit"
              disabled={isPending || entry.status === "RUNNING"}
            >
              {isPending ? "Saving..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
