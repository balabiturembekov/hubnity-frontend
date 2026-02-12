import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { UserEntity } from "@/entities/user";
import {
  type CreateEmployeeSchemaValues,
  createEmployeeSchema,
  type UpdateEmployeeSchemaValues,
  updateEmployeeSchema,
} from "../model/employees.schema";
import { useCreateEmployeeMutation } from "../model/mutations/use-create-employee.mutation";
import { useUpdateEmployeeMutation } from "../model/mutations/use-update-employee.mutation";

interface UseEmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "create" | "update";
  employee?: UserEntity;
}

export const useEmployeeForm = ({
  open,
  onOpenChange,
  variant,
  employee,
}: UseEmployeeFormProps) => {
  const isCreate = variant === "create";
  const { mutateAsync: createEmployee, isPending: isCreating } =
    useCreateEmployeeMutation();
  const { mutateAsync: updateEmployee, isPending: isUpdating } =
    useUpdateEmployeeMutation();

  const form = useForm<CreateEmployeeSchemaValues | UpdateEmployeeSchemaValues>(
    {
      resolver: zodResolver(
        isCreate ? createEmployeeSchema : updateEmployeeSchema,
      ),
      defaultValues: {
        name: "",
        email: "",
        password: "",
        role: "EMPLOYEE",
        status: "ACTIVE",
        hourlyRate: undefined,
        avatar: "",
      },
    },
  );

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (open) {
      if (variant === "update" && employee) {
        reset({
          name: employee.name,
          email: employee.email,
          password: "",
          role: employee.role,
          status: employee.status,
          hourlyRate: employee.hourlyRate || undefined,
          avatar: employee.avatar || "",
        });
      } else {
        reset({
          name: "",
          email: "",
          password: "",
          role: "EMPLOYEE",
          status: "ACTIVE",
          hourlyRate: undefined,
          avatar: "",
        });
      }
    }
  }, [open, variant, employee, reset]);

  const onSubmit = async (
    data: CreateEmployeeSchemaValues | UpdateEmployeeSchemaValues,
  ) => {
    try {
      if (isCreate) {
        await createEmployee(data as CreateEmployeeSchemaValues);
        toast.success("Employee created successfully");
      } else {
        if (!employee?.id) {
          toast.error("Employee ID is missing");
          return;
        }
        await updateEmployee({
          id: employee.id,
          data: data as UpdateEmployeeSchemaValues,
        });
        toast.success("Employee updated successfully");
      }
      onOpenChange(false);
    } catch {}
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string>("");

  const avatarPreview = form.watch("avatar");

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("Image size must be less than 50MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result && typeof reader.result === "string") {
        setImageToCrop(reader.result);
        setCropDialogOpen(true);
      } else {
        toast.error("Failed to read image file");
      }
    };
    reader.onerror = () => {
      toast.error("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    form.setValue("avatar", "");
  };

  const handleCropComplete = (croppedImage: string) => {
    form.setValue("avatar", croppedImage, {
      shouldDirty: true,
      shouldValidate: true,
    });
    setImageToCrop("");
  };

  return {
    form,
    errors,
    isPending: isCreating || isUpdating,
    handleClose,
    onSubmit: handleSubmit(onSubmit),
    avatarPreview,
    cropDialogOpen,
    setCropDialogOpen,
    imageToCrop,
    handleAvatarChange,
    handleRemoveAvatar,
    handleCropComplete,
  };
};
