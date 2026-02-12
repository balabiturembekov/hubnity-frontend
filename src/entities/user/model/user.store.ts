import { create } from "zustand/react";
import type { UserEntity } from "@/entities/user/model/user.types";

type UserState = {
  user: UserEntity | null;
  isInitializing: boolean;

  setUser: (user: UserEntity) => void;
  setIsInitializing: (isInitializing: boolean) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isInitializing: true,

  setUser: (user) => set({ user }),
  setIsInitializing: (isInitializing) => set({ isInitializing }),
  clearUser: () => set({ user: null }),
}));
