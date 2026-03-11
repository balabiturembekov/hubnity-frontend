"use client";

import { useOrganizationRole } from "@/entities/organization";
import { useGetCurrentUserQuery } from "@/entities/user";
import {
  ExportTeamActivityCSV,
  MembersTable,
  TeamActivityFilterForm,
} from "@/features/team-activity";
import { DashboardContainer } from "@/widgets/dashboard";
import { DashboardPageHeader } from "@/widgets/header";
import {
  SummaryCards,
  TeamActivityPageSkeleton,
} from "@/widgets/team-activity";

export default function AdminTeamActivityPage() {
  const { isAdmin } = useOrganizationRole();
  const { data, isPending } = useGetCurrentUserQuery();

  if (isPending || !data) {
    return <TeamActivityPageSkeleton />;
  }

  return (
    <DashboardContainer>
      <DashboardPageHeader
        title="Team & Activity"
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
    </DashboardContainer>
  );
}
