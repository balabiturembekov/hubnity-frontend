"use client";

import { Edit, Pencil } from "lucide-react";
import { useState } from "react";
import type { UserEntity } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { EmployeeDialog } from "./employee-dialog";

interface UpdateEmployeeDialogProps {
  user: UserEntity;
  variant?: "icon" | "outline";
}

import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";

export function UpdateEmployeeDialog({
  user,
  variant = "icon",
}: UpdateEmployeeDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant={variant === "icon" ? "ghost" : "outline"}
            size={variant === "icon" ? "icon" : "default"}
            onClick={() => setOpen(true)}
          >
            {variant === "icon" ? (
              <Edit className="size-4" />
            ) : (
              <>
                <Pencil />
                Edit employee
              </>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit employee</TooltipContent>
      </Tooltip>
      <EmployeeDialog open={open} onOpenChange={setOpen} user={user} />
    </>
  );
}
