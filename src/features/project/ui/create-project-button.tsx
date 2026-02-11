"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { ProjectDialog } from "@/features/project/ui/project-dialog";
import { Button } from "@/shared/ui/button";

interface CreateProjectButtonProps {
  variant?: "primary" | "secondary";
}

export const CreateProjectButton = ({
  variant = "primary",
}: CreateProjectButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        {variant === "primary" ? (
          <>
            <Plus />
            Add Project
          </>
        ) : (
          "Create Project"
        )}
      </Button>
      <ProjectDialog variant="create" open={open} onOpenChange={setOpen} />
    </>
  );
};
