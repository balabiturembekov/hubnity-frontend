import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useUpdateProfileMutation } from "@/entities/user";
import { handleError } from "@/shared/lib/utils";
import {
  type ChangePasswordFormValues,
  changePasswordSchema,
} from "./auth.schema";

interface ChangePasswordProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const useChangePassword = ({
  open,
  onOpenChange,
}: ChangePasswordProps) => {
  const { mutateAsync, isPending } = useUpdateProfileMutation();
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
      await mutateAsync({
        password: data.newPassword,
      });

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
