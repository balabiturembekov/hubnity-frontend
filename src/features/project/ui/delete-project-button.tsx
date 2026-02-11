"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { ProjectEntity } from "@/entities/project";
import { DeleteProjectDialog } from "@/features/project/ui/delete-project-dialog";
import { Button } from "@/shared/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/ui/tooltip";

interface DeleteProjectButtonProps {
  project: ProjectEntity;
}

export const DeleteProjectButton = ({ project }: DeleteProjectButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => setOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Delete project</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DeleteProjectDialog
        open={open}
        onOpenChange={setOpen}
        project={project}
      />
    </>
  );
};
