export interface GetIdleDetectionSettingsRes {
  idleDetectionEnabled: boolean;
  idleThreshold: number;
}

export interface UpdateIdleDetectionSettingsReq {
  idleDetectionEnabled?: boolean;
  idleThreshold?: number;
}

export interface UpdateIndividualIdleDetectionSettingsReq {
  idleThreshold?: number;
}
