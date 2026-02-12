// features/screenshot-settings/hooks/use-screenshot-settings.ts
import { useMemo } from "react";
import {
  type ScreenshotInterval,
  useGetScreenshotSettingsQuery,
  useUpdateScreenshotSettingsMutation,
} from "@/entities/screenshot-settings";
import { useUserStore } from "@/entities/user";

const DEFAULT_SETTINGS = {
  screenshotEnabled: false,
  screenshotInterval: 60 as ScreenshotInterval,
};

export function useScreenshotSettings() {
  const { user } = useUserStore();
  const { data, isLoading } = useGetScreenshotSettingsQuery({
    enabled: !!user,
  });
  const { mutateAsync, isPending } = useUpdateScreenshotSettingsMutation();

  const canEdit = user?.role === "ADMIN" || user?.role === "OWNER";

  const settings = useMemo(() => {
    if (!data) {
      return DEFAULT_SETTINGS;
    }

    const validIntervals: ScreenshotInterval[] = [30, 60, 300, 600];
    const interval = validIntervals.includes(data.screenshotInterval)
      ? data.screenshotInterval
      : DEFAULT_SETTINGS.screenshotInterval;

    return {
      screenshotEnabled:
        data.screenshotEnabled ?? DEFAULT_SETTINGS.screenshotEnabled,
      screenshotInterval: interval,
    };
  }, [data]);

  const setEnabled = async (enabled: boolean) => {
    if (!canEdit) {
      throw new Error("Only administrators can update screenshot settings");
    }

    await mutateAsync({ screenshotEnabled: enabled });
  };

  const setInterval = async (interval: ScreenshotInterval) => {
    if (!canEdit) {
      throw new Error("Only administrators can update screenshot settings");
    }

    const validIntervals: ScreenshotInterval[] = [30, 60, 300, 600];
    if (!validIntervals.includes(interval)) {
      throw new Error("Invalid interval value");
    }

    await mutateAsync({ screenshotInterval: interval });
  };

  return {
    settings,
    isLoading: isLoading || isPending,
    canEdit,
    setEnabled,
    setInterval,
  };
}
