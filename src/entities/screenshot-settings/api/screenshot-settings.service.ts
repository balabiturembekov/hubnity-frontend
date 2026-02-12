import type {
  ScreenshotSettingsEntity,
  UpdateScreenshotSettingsReq,
} from "@/entities/screenshot-settings/model/screenshot-settings.type";
import { api } from "@/shared/config/api";

class ScreenshotSettingsService {
  async getCompanyScreenshotSettings() {
    const res = await api.get<ScreenshotSettingsEntity>(
      "/companies/screenshot-settings",
    );
    return res.data;
  }

  async updateCompanyScreenshotSettings(payload: UpdateScreenshotSettingsReq) {
    const res = await api.patch<ScreenshotSettingsEntity>(
      "/companies/screenshot-settings",
      payload,
    );
    return res.data;
  }
}
export const screenshotSettingsService = new ScreenshotSettingsService();
