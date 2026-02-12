import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  type PatchUserReq,
  type UserEntity,
  userService,
} from "@/entities/user";
import { handleError } from "@/shared/lib/utils";
import type { UpdateEmployeeSchemaValues } from "../employees.schema";

export const useUpdateEmployeeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    UserEntity,
    Error,
    { id: string; data: UpdateEmployeeSchemaValues }
  >({
    mutationFn: ({ id, data }) => {
      const payload: PatchUserReq = {
        ...data,
      };

      if (!payload.password) {
        delete payload.password;
      }

      return userService.updateEmployee(id, payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to update employee"));
    },
  });
};
