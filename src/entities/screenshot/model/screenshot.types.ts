import type { Timestamps } from "@/shared/model/types";

export interface ScreenshotEntity extends Timestamps {
  id: string;
  timeEntryId: string;
  imageUrl: string;
  thumbnailUrl: string;
  timestamp: string;
}

export interface GetScreenshotReq {
  id: string;
}

export interface GetScreenshotsParams {
  limit?: number;
}
