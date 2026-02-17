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
      let accessToken = Cookies.get("access_token");
      const refreshToken = Cookies.get("refresh_token");

      // No tokens at all → redirect to login
      if (!accessToken && !refreshToken) {
        await authService.logout();
        setIsInitializing(false);
        router.replace("/login");
        return;
      }

      // Have refresh_token but no (or expired) access_token → refresh first
      if (!accessToken && refreshToken) {
        const refreshed = await authService.refreshTokens();
        if (!refreshed) {
          await authService.logout();
          setIsInitializing(false);
          router.replace("/login");
          return;
        }
        accessToken = refreshed.access_token;
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
