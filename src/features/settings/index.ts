export { settingsService } from "./api/settings.service";
export {
  formValuesToIdleSettingsPayload,
  idleSettingsToFormValues,
  idleThresholdSecondsToCustomMinutes,
  idleThresholdSecondsToInterval,
  intervalAndCustomToSeconds,
} from "./model/idle-settings.mappers";
export { useUpdateIdleSettingsMutation } from "./model/mutations/update-idle-settings.mutation";
export { updateIndividualIdleSettingsMutations } from "./model/mutations/update-individual-idle-settings.mutations";
export { getIdleSettingsQuery } from "./model/queries/get-idle-settings.query";
export * from "./model/settings.schema";
export type {
  GetIdleDetectionSettingsRes,
  UpdateIdleDetectionSettingsReq,
} from "./model/settings.types";
