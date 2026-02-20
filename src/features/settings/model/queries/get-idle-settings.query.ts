import { useQuery } from "@tanstack/react-query";
import { settingsService } from "@/features/settings";

export const getIdleSettingsQuery = () =>
  useQuery({
    queryKey: ["idleSettings"],
    queryFn: settingsService.getIdleSettings,
  });
