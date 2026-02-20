import {
  DashboardPageHeaderSkeleton,
  MembersIdleListSkeleton,
  MembersIdleSettingsFormSkeleton,
} from "@/widgets/skeleton";

export const MembersPageSkeleton = () => {
  return (
    <main className="flex-1 overflow-y-auto">
      <DashboardPageHeaderSkeleton isButtonVisible={false} />
      <div className="space-y-4 p-2 sm:p-6">
        <MembersIdleSettingsFormSkeleton />
        <MembersIdleListSkeleton />
      </div>
    </main>
  );
};
