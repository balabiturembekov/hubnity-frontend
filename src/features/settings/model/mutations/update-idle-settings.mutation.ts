import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { settingsService } from "@/features/settings";
import type { UpdateIdleDetectionSettingsReq } from "@/features/settings/model/settings.types";
import { queryClient } from "@/shared/config/query-client";

export const useUpdateIdleSettingsMutation = () =>
  useMutation({
    mutationFn: (payload: UpdateIdleDetectionSettingsReq) =>
      settingsService.updateIdleSettings(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["idleSettings"] });
      toast.success("Successfully updated idle detection settings");
    },
  });
