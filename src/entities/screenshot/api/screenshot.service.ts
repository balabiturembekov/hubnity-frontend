import type {
  GetScreenshotReq,
  GetScreenshotsParams,
  ScreenshotEntity,
} from "@/entities/screenshot/model/screenshot.types";
import { api } from "@/shared/config/api";

class ScreenshotService {
  async getScreenshots() {
    const res = await api.get<ScreenshotEntity[]>("/screenshots");
    return res.data;
  }

  async getScreenshotsByTimeEntry(
    { id }: GetScreenshotReq,
    params?: GetScreenshotsParams,
  ) {
    const res = await api.get<ScreenshotEntity[]>(
      `/screenshots/time-entry/${id}`,
      {
        params,
      },
    );
    return res.data;
  }

  async deleteScreenshot(id: string) {
    await api.delete(`/screenshots/${id}`);
  }
}
export const screenshotService = new ScreenshotService();
