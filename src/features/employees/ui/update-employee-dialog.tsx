"use client";

import { Edit } from "lucide-react";
import { useState } from "react";
import type { UserEntity } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { EmployeeDialog } from "./employee-dialog";

interface UpdateEmployeeDialogProps {
  user: UserEntity;
}

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

export function UpdateEmployeeDialog({ user }: UpdateEmployeeDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
            <Edit className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit employee</TooltipContent>
      </Tooltip>
      <EmployeeDialog open={open} onOpenChange={setOpen} user={user} />
    </>
  );
}
