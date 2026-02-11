import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateProjectMutation } from "@/entities/project/model/mutations/use-create-project.mutation";
import { useUpdateProjectMutation } from "@/entities/project/model/mutations/use-update-project.mutation";
import type { ProjectEntity } from "@/entities/project/model/project.types";
import {
  type CreateProjectValues,
  createProjectSchema,
} from "@/features/project/model/project.schema";
import { handleError } from "@/shared/lib/utils";

interface UseProjectFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "create" | "update";
  project?: ProjectEntity;
}

export const useProjectForm = ({
  onOpenChange,
  variant,
  project,
  open,
}: UseProjectFormProps) => {
  const isCreate = variant === "create";
  const { mutateAsync: createProject, isPending: isCreating } =
    useCreateProjectMutation();
  const { mutateAsync: updateProject, isPending: isUpdating } =
    useUpdateProjectMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
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

  useEffect(() => {
    if (open) {
      if (variant === "update" && project) {
        reset({
          name: project.name,
          description: project.description || "",
          color: project.color || "#3b82f6",
          clientName: project.clientName || "",
          budget: project.budget || 0,
          status: project.status,
        });
      } else {
        reset({
          name: "",
          description: "",
          color: "#3b82f6",
          clientName: "",
          budget: 0,
          status: "ACTIVE",
        });
      }
    }
  }, [open, variant, project, reset]);

  const onSubmit = async (data: CreateProjectValues) => {
    try {
      if (isCreate) {
        await createProject(data);
        toast.success("Project created successfully");
      } else {
        if (!project?.id) {
          toast.error("Project ID is missing");
          return;
        }
        await updateProject({ id: project.id, data });
        toast.success("Project updated successfully");
      }
      onOpenChange(false);
    } catch (e) {
      toast.error(
        handleError(
          e,
          isCreate ? "Failed to create project" : "Failed to update project",
        ),
      );
    }
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  return {
    register,
    handleSubmit,
    errors,
    isPending: isCreating || isUpdating,
    handleClose,
    onSubmit,
    control,
  };
};
