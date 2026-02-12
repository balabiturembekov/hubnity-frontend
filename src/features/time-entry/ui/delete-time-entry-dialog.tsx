"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  type TimeEntryEntity,
  useDeleteTimeEntryMutation,
} from "@/entities/time-entry";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/ui/alert-dialog";
import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

interface DeleteTimeEntryDialogProps {
  timeEntry: TimeEntryEntity;
}

export const DeleteTimeEntryDialog = ({
  timeEntry,
}: DeleteTimeEntryDialogProps) => {
  const { mutate: deleteTimeEntry, isPending: isDeleting } =
    useDeleteTimeEntryMutation();
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(true)}
          disabled={
            timeEntry.status === "RUNNING" || timeEntry.status === "PAUSED"
          }
          asChild
        >
          <TooltipTrigger>
            <Trash2 className="h-4 w-4 text-destructive" />
          </TooltipTrigger>
        </Button>
        <TooltipContent>
          <p>
            {timeEntry.status === "RUNNING" || timeEntry.status === "PAUSED"
              ? "Stop the timer before deleting"
              : "Delete time timeEntry"}
          </p>
        </TooltipContent>
      </Tooltip>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Time Entry</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this time entry? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteTimeEntry(timeEntry.id)}
              disabled={isDeleting}
              variant="destructive"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </TooltipProvider>
  );
};
