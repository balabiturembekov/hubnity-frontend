import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";
import { organizationService } from "../../api/organization.service";
import type { MemberEntity } from "../organization.types";
import type { CreateMemberValues } from "../schemas/create-member.schema";

export const useCreateMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    MemberEntity,
    Error,
    { orgId: string; payload: CreateMemberValues }
  >({
    mutationKey: ["create-member"],
    mutationFn: ({ orgId, payload }) =>
      organizationService.createMember(orgId, payload),
    onSuccess: (_, { orgId }) => {
      toast.success("Member created successfully");
      queryClient.invalidateQueries({ queryKey: ["members", orgId] });
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to create member"));
    },
  });
};
