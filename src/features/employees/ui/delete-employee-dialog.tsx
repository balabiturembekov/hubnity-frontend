import { Trash2 } from "lucide-react";
import { useState } from "react";
import type { UserEntity } from "@/entities/user";
import { useUserStore } from "@/entities/user";
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { useDeleteEmployeeMutation } from "../model/mutations/use-delete-employee.mutation";

interface DeleteEmployeeDialogProps {
  employee: UserEntity;
}

export const DeleteEmployeeDialog = ({
  employee,
}: DeleteEmployeeDialogProps) => {
  const [open, setOpen] = useState(false);
  const { user: currentUser } = useUserStore();
  const { mutateAsync, isPending } = useDeleteEmployeeMutation();

  const isSelf = employee.id === currentUser?.id;

  const handleDelete = async () => {
    try {
      await mutateAsync(employee.id);
      setOpen(false);
    } catch {}
  };

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            disabled={isSelf}
            className="text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isSelf ? "Cannot delete yourself" : "Delete employee"}
        </TooltipContent>
      </Tooltip>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Employee</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{employee.name}&quot;? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40"
            >
              {isPending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
