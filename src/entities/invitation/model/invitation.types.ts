export const firstUsersRoles = ["USER", "MANAGER"] as const;
export type FirstUsersRoles = (typeof firstUsersRoles)[number];
