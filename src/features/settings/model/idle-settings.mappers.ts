import type {
  IdleIntervalOption,
  IdleSettingsFormValues,
} from "./settings.schema";
import type {
  GetIdleDetectionSettingsRes,
  UpdateIdleDetectionSettingsReq,
} from "./settings.types";

/** Preset intervals in seconds: 2, 5, 10, 20 minutes */
const PRESET_SECONDS = [120, 300, 600, 1200] as const;
const PRESET_MINUTES = [2, 5, 10, 20] as const;

/** Convert idleThreshold (seconds) to interval option for individual member settings */
export function idleThresholdSecondsToInterval(
  seconds: number,
): IdleIntervalOption {
  const presetIndex = PRESET_SECONDS.indexOf(
    seconds as (typeof PRESET_SECONDS)[number],
  );
  if (presetIndex >= 0) {
    return `${PRESET_MINUTES[presetIndex]} mins` as IdleIntervalOption;
  }
  return "Custom";
}

/** Custom minutes when interval is "Custom" (seconds / 60, clamped) */
export function idleThresholdSecondsToCustomMinutes(seconds: number): number {
  return Math.min(120, Math.max(1, Math.round(seconds / 60)));
}

/** Convert interval + customMinutes to idleThreshold in seconds */
export function intervalAndCustomToSeconds(
  interval: IdleIntervalOption,
  customMinutes: number,
): number {
  return interval === "Custom"
    ? customMinutes * 60
    : parseInt(interval, 10) * 60;
}

export function idleSettingsToFormValues(
  data: GetIdleDetectionSettingsRes,
): IdleSettingsFormValues {
  const seconds = data.idleThreshold;
  const presetIndex = PRESET_SECONDS.indexOf(
    seconds as (typeof PRESET_SECONDS)[number],
  );
  const intervalOption =
    presetIndex >= 0 ? `${PRESET_MINUTES[presetIndex]} mins` : "Custom";
  const customMinutes =
    intervalOption === "Custom" ? Math.round(seconds / 60) : 5;
  return {
    idleDetectionEnabled: data.idleDetectionEnabled,
    interval: intervalOption as IdleSettingsFormValues["interval"],
    customMinutes: Math.min(120, Math.max(1, customMinutes)),
  };
}

export function formValuesToIdleSettingsPayload(
  values: IdleSettingsFormValues,
): UpdateIdleDetectionSettingsReq {
  const idleThresholdSeconds =
    values.interval === "Custom"
      ? values.customMinutes * 60
      : parseInt(values.interval, 10) * 60;
  return {
    idleDetectionEnabled: values.idleDetectionEnabled,
    idleThreshold: idleThresholdSeconds,
  };
}
