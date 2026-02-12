import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { screenshotSettingsService } from "@/entities/screenshot-settings/api/screenshot-settings.service";
import type {
  ScreenshotSettingsEntity,
  UpdateScreenshotSettingsReq,
} from "@/entities/screenshot-settings/model/screenshot-settings.type";
import { handleError } from "@/shared/lib/utils";

interface MutationContext {
  previousSettings?: ScreenshotSettingsEntity;
}

export const useUpdateScreenshotSettingsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ScreenshotSettingsEntity,
    Error,
    UpdateScreenshotSettingsReq,
    MutationContext
  >({
    mutationKey: ["updateScreenshotSettings"],
    mutationFn: (payload) =>
      screenshotSettingsService.updateCompanyScreenshotSettings(payload),
    onMutate: async (newSettings) => {
      await queryClient.cancelQueries({ queryKey: ["screenshotSettings"] });

      const previousSettings =
        queryClient.getQueryData<ScreenshotSettingsEntity>([
          "screenshotSettings",
        ]);

      if (previousSettings) {
        queryClient.setQueryData<ScreenshotSettingsEntity>(
          ["screenshotSettings"],
          {
            ...previousSettings,
            ...newSettings,
          },
        );
      }

      return { previousSettings };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["screenshotSettings"] });
    },
    onError: (error, _, context) => {
      if (context?.previousSettings) {
        queryClient.setQueryData(
          ["screenshotSettings"],
          context.previousSettings,
        );
      }
      toast.error(handleError(error, "Failed to update screenshot settings"));
    },
  });
};
