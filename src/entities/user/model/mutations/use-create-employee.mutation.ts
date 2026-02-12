import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { UserEntity } from "@/entities/user";
import { userService } from "@/entities/user";
import { handleError } from "@/shared/lib/utils";
import type { CreateEmployeeSchemaValues } from "../schemas/create-employee-schema";

export const useCreateEmployeeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<UserEntity, Error, CreateEmployeeSchemaValues>({
    mutationFn: (data) => {
      return userService.createEmployee(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to create employee"));
    },
  });
};
