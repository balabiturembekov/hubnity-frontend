"use client";

import { useUser, useUserStore } from "@/entities/user";
import {
  ExportTeamActivityCSV,
  MembersTable,
  TeamActivityFilterForm,
} from "@/features/team-activity";
import { DashboardPageHeader } from "@/widgets/header";
import {
  SummaryCards,
  TeamActivityPageSkeleton,
} from "@/widgets/team-activity";

export default function AdminTeamActivityPage() {
  const { isAdmin } = useUser();
  const { user, isInitializing } = useUserStore();

  if (isInitializing || !user) {
    return <TeamActivityPageSkeleton />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <div className="bg-linear-to-b from-primary/5 via-background to-background">
            <DashboardPageHeader
              title="Time & Activity"
              subTitle={
                isAdmin
                  ? "See team members' time worked, activity levels, and amounts earned per project"
                  : "View your time worked, activity levels, and amounts earned per project"
              }
            >
              <ExportTeamActivityCSV />
            </DashboardPageHeader>

            <div className="p-2 md:p-6 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <TeamActivityFilterForm />
              </div>

              <div className="col-span-2">
                <SummaryCards />
              </div>

              <div className="col-span-2">
                <MembersTable />
              </div>
            </div>

            {/* <div className="p-6">
              <div className="space-y-6">
                <TeamActivityFilterForm />
                <SummaryCards />
                <MembersTable />
              </div>
            </div> */}
          </div>
        </main>
      </div>
    </div>
  );
}
