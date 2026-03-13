export { userService } from "./api/user.service";
export {
  PROFILE_STATISTICS,
  type ProfileStatisticId,
} from "./consts/profile-statistics";
export { useEmployeesStats } from "./hooks/use-employees-stats";
export { useUpdateProfileMutation } from "./model/mutations/use-update-profile.mutation";
export { useGetCurrentUserQuery } from "./model/queries/use-get-current-user.query";
export type {
  PatchUserReq,
  UserEntity,
  UserRole,
} from "./model/user.types";
export { UserAvatar } from "./ui/user-avatar";
