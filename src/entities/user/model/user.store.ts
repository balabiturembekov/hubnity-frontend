import { create } from "zustand/react";
import type { UserEntity } from "@/entities/user/model/user.types";

type UserState = {
  user: UserEntity | null;
  setUser: (user: UserEntity) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),
}));
