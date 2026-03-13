import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { type Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type CreateMemberValues,
  createMemberSchema,
  type MemberEntity,
  type MemberRole,
  type MemberStatus,
  type UpdateMemberValues,
  updateMemberSchema,
  useCreateMemberMutation,
  useUpdateMemberMutation,
} from "@/entities/organization";
import { useGetOrganizationId } from "@/shared/hooks/use-get-organization-id";

interface UseEmployeeFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "create" | "update";
  employee?: MemberEntity;
}

type EmployeeFormValues = {
  email: string;
  role: MemberRole;
  status: MemberStatus;
  hourlyRate?: number;
  weeklyLimit?: number;
};

export const useEmployeeForm = ({
  open,
  onOpenChange,
  variant,
  employee,
}: UseEmployeeFormProps) => {
  const isCreate = variant === "create";
  const orgId = useGetOrganizationId();
  const { mutateAsync: createEmployee, isPending: isCreating } =
    useCreateMemberMutation();
  const { mutateAsync: updateEmployee, isPending: isUpdating } =
    useUpdateMemberMutation();

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(
      isCreate ? createMemberSchema : updateMemberSchema,
    ) as Resolver<EmployeeFormValues>,
    defaultValues: {
      email: "",
      hourlyRate: undefined,
      weeklyLimit: undefined,
      role: "USER",
      status: "ACTIVE",
    },
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (open) {
      if (variant === "update" && employee) {
        reset({
          hourlyRate: employee.hourlyRate || undefined,
          weeklyLimit: employee.weeklyLimit || undefined,
          role: employee.role,
          status: employee.status,
        });
      } else {
        reset({
          email: "",
          hourlyRate: undefined,
          weeklyLimit: undefined,
          role: "USER",
          status: "ACTIVE",
        });
      }
    }
  }, [open, variant, employee, reset]);

  const onSubmit = async (data: EmployeeFormValues) => {
    try {
      if (isCreate) {
        await createEmployee({ orgId, payload: data as CreateMemberValues });
      } else {
        if (!employee?.id) {
          toast.error("Employee ID is missing");
          return;
        }
        await updateEmployee({
          orgId,
          memberId: employee.id,
          payload: data as UpdateMemberValues,
        });
      }
      onOpenChange(false);
    } catch {}
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return {
    form,
    errors,
    isPending: isCreating || isUpdating,
    handleClose,
    onSubmit: handleSubmit(onSubmit),
  };
};
