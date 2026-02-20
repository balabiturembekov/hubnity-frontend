import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingsService } from "@/features/settings";
import type { UpdateIndividualIdleDetectionSettingsReq } from "@/features/settings/model/settings.types";
import { queryClient } from "@/shared/config/query-client";

export const updateIndividualIdleSettingsMutations = (
  userId: string,
  payload: UpdateIndividualIdleDetectionSettingsReq,
) =>
  useMutation({
    mutationFn: () =>
      settingsService.updateIndividualIdleSettings(userId, payload),
    onSuccess: async () => {
      toast.success("Idle settings updated successfully");
      await queryClient.invalidateQueries({
        queryKey: ["individualIdleSettings", userId],
      });
    },
  });
