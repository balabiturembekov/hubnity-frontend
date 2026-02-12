import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import { screenshotSettingsService } from "@/entities/screenshot-settings/api/screenshot-settings.service";
import type { ScreenshotSettingsEntity } from "@/entities/screenshot-settings/model/screenshot-settings.type";

export const useGetScreenshotSettingsQuery = (
  options?: Omit<
    UseQueryOptions<ScreenshotSettingsEntity, Error>,
    "queryKey" | "queryFn"
  >,
) =>
  useQuery<ScreenshotSettingsEntity, Error>({
    queryKey: ["screenshotSettings"],
    queryFn: screenshotSettingsService.getCompanyScreenshotSettings,
    ...options,
  });
