"use client";

import { useGetCurrentUserQuery } from "@/entities/user";
import { ProfilePageSkeleton } from "@/widgets/profile";
import { ProfilePageContent } from "@/widgets/profile/ui/profile-page-content";

export const ProfilePageClient = () => {
  const { data: user, isPending } = useGetCurrentUserQuery();

  if (isPending || !user) {
    return <ProfilePageSkeleton />;
  }

  return <ProfilePageContent />;
};
