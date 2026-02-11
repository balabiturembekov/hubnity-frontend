import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProjectMutation } from "@/entities/project/model/mutations/use-create-project.mutation";
import {
  type CreateProjectValues,
  createProjectSchema,
} from "@/features/project/model/project.schema";
import { handleError } from "@/shared/lib/utils";

interface UseCreateProjectProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const useCreateProject = ({ onOpenChange }: UseCreateProjectProps) => {
  const { mutateAsync, isPending } = useCreateProjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<CreateProjectValues>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      description: "",
      color: "#3b82f6",
      clientName: "",
      budget: 0,
      status: "ACTIVE",
    },
  });

  const onSubmit = async (data: CreateProjectValues) => {
    try {
      await mutateAsync(data);
      toast.success("Project created successfully");
      onOpenChange(false);
    } catch (e) {
      toast.error(handleError(e, "Failed to create project"));
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
    handleClose,
    onSubmit,
    control,
  };
};
