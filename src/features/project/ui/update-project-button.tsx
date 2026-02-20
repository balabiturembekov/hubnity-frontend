"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import type { ProjectEntity } from "@/entities/project";
import { ProjectDialog } from "@/features/project/ui/project-dialog";
import { Button } from "@/shared/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

interface UpdateProjectButtonProps {
  project: ProjectEntity;
}

export const UpdateProjectButton = ({ project }: UpdateProjectButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setOpen(true)}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit project</TooltipContent>
      </Tooltip>

      <ProjectDialog
        open={open}
        onOpenChange={setOpen}
        variant="update"
        project={project}
      />
    </>
  );
};
