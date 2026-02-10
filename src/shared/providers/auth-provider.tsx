"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { userService, useUserStore } from "@/entities/user";
import { authService } from "@/features/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, setUser, setIsInitializing } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const init = async () => {
      const token = Cookies.get("access_token");

      if (!token) {
        await authService.logout();
        setIsInitializing(false);
        router.replace("/login");
        return;
      }

      if (user) {
        setIsInitializing(false);
        return;
      }

      try {
        const userData = await userService.getMe();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user session:", error);
        await authService.logout();
        router.replace("/login");
      } finally {
        setIsInitializing(false);
      }
    };

    init();
  }, [user, setUser, setIsInitializing, router]);

  return <>{children}</>;
};
