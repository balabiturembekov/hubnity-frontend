import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";
import { organizationService } from "../../api/organization.service";
import type { MemberEntity } from "../organization.types";
import type { UpdateMemberValues } from "../schemas/update-member.schema";

export const useUpdateMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    MemberEntity,
    Error,
    { orgId: string; memberId: string; payload: UpdateMemberValues }
  >({
    mutationKey: ["update-member"],
    mutationFn: ({ orgId, memberId, payload }) =>
      organizationService.updateMember(orgId, memberId, payload),
    onSuccess: (_, { orgId }) => {
      toast.success("Member updated successfully");
      queryClient.invalidateQueries({ queryKey: ["members", orgId] });
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to update member"));
    },
  });
};
