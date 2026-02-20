export type ScreenshotInterval = 300 | 600 | 900;

export interface ScreenshotSettingsEntity {
  screenshotEnabled: boolean;
  screenshotInterval: ScreenshotInterval;
}

export interface UpdateScreenshotSettingsReq {
  screenshotEnabled?: boolean;
  screenshotInterval?: ScreenshotInterval;
}
