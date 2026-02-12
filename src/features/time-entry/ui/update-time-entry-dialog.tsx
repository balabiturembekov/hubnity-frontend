"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import type { TimeEntryEntity } from "@/entities/time-entry";
import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";
import { TimeEntryDialog } from "@/widgets/time-entry";

interface UpdateButtonEntryDialogProps {
  timeEntry: TimeEntryEntity;
}

export const UpdateTimeEntryDialog = ({
  timeEntry,
}: UpdateButtonEntryDialogProps) => {
  const [open, setOpen] = useState(false);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={timeEntry.status === "RUNNING"}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {timeEntry.status === "RUNNING"
              ? "Stop the timer before editing"
              : "Edit time entry"}
          </p>
        </TooltipContent>
      </Tooltip>

      <TimeEntryDialog open={open} onOpenChange={setOpen} entry={timeEntry} />
    </TooltipProvider>
  );
};
