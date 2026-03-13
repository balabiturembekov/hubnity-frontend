import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { handleError } from "@/shared/lib/utils";
import { organizationService } from "../../api/organization.service";

export const useDeleteMemberMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, { orgId: string; memberId: string }>({
    mutationKey: ["delete-member"],
    mutationFn: ({ orgId, memberId }) =>
      organizationService.deleteMember(orgId, memberId),
    onSuccess: (_, { orgId }) => {
      toast.success("Member deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["members", orgId] });
    },
    onError: (error) => {
      toast.error(handleError(error, "Failed to delete member"));
    },
  });
};
