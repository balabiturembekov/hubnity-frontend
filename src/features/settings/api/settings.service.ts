import type {
  GetIdleDetectionSettingsRes,
  UpdateIdleDetectionSettingsReq,
} from "@/features/settings/model/settings.types";
import { api } from "@/shared/config/api";

class SettingsService {
  async getIdleSettings() {
    const res = await api.get<GetIdleDetectionSettingsRes>(
      "/companies/idle-detection-settings",
    );
    return res.data;
  }

  async updateIdleSettings(payload: UpdateIdleDetectionSettingsReq) {
    const res = await api.patch<GetIdleDetectionSettingsRes>(
      "/companies/idle-detection-settings",
      payload,
    );
    return res.data;
  }
}
export const settingsService = new SettingsService();
