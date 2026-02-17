import { EditProfileButton } from "@/features/auth";
import { DashboardPageHeader } from "@/widgets/header";
import {
  ProfileInfo,
  ProfileStatistics,
  ProfileStats,
  RecentActivity,
} from "@/widgets/profile";

export const ProfilePageContent = () => {
  return (
    <div className="flex h-screen overflow-auto bg-background">
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto">
          <div className="bg-linear-to-b from-primary/5 via-background to-background">
            <DashboardPageHeader
              title="My Profile"
              subTitle="View and manage your profile settings"
            >
              <EditProfileButton />
            </DashboardPageHeader>

            <div className="p-6">
              <div className="space-y-6">
                <ProfileStats />

                <div className="grid gap-6 md:grid-cols-2">
                  <ProfileInfo />
                  <ProfileStatistics />
                </div>

                <RecentActivity />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
