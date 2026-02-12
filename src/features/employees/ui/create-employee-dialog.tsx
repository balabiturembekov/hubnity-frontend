"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/ui/button";
import { EmployeeDialog } from "./employee-dialog";

export function CreateEmployeeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        Add Employee
      </Button>
      <EmployeeDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
