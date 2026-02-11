"use client";

import { useUserStore } from "@/entities/user";
import { ProfilePageSkeleton } from "@/widgets/profile";
import { ProfilePageContent } from "@/widgets/profile/ui/profile-page-content";

export const ProfilePageClient = () => {
  const { user, isInitializing } = useUserStore();

  if (isInitializing || !user) {
    return <ProfilePageSkeleton />;
  }

  return <ProfilePageContent />;
};
