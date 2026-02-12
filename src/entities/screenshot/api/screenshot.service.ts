import type { ScreenshotEntity } from "@/entities/screenshot/model/screenshot.types";
import { api } from "@/shared/config/api";

class ScreenshotService {
  async getScreenshots() {
    const res = await api.get<ScreenshotEntity[]>("/screenshots");
    return res.data;
  }

  async getScreenshotsByTimeEntry(timeEntryId: string) {
    const res = await api.get<ScreenshotEntity[]>(
      `/screenshots/time-entry/${timeEntryId}`,
    );
    return res.data;
  }

  async deleteScreenshot(id: string) {
    await api.delete(`/screenshots/${id}`);
  }
}

export const screenshotService = new ScreenshotService();
