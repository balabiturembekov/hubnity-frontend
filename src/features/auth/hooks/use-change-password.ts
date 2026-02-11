import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useChangePasswordMutation } from "@/features/auth/model/mutations/use-change-password.mutation";
import { handleError } from "@/shared/lib/utils";
import {
  type ChangePasswordFormValues,
  changePasswordSchema,
} from "../model/auth.schema";

interface ChangePasswordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const useChangePassword = ({
  open,
  onOpenChange,
}: ChangePasswordProps) => {
  const { mutateAsync, isPending } = useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const onSubmit = async (data: ChangePasswordFormValues) => {
    try {
      await mutateAsync(data);

      toast.success("Password changed successfully");
      onOpenChange(false);
    } catch (error) {
      console.error(handleError(error, "Failed to change password"));
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    handleClose,
  };
};
