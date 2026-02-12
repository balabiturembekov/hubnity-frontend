export type ScreenshotInterval = 30 | 60 | 300 | 600;

export interface ScreenshotSettingsEntity {
  screenshotEnabled: boolean;
  screenshotInterval: ScreenshotInterval;
}

export interface UpdateScreenshotSettingsReq {
  screenshotEnabled?: boolean;
  screenshotInterval?: ScreenshotInterval;
}
