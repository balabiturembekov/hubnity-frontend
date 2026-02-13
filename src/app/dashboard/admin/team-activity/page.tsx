"use client";

import { Download } from "lucide-react";
import { useUser } from "@/entities/user";
import {
  MembersTable,
  SummaryCards,
  TeamActivityFilterForm,
} from "@/features/team-activity";
import { Button } from "@/shared/ui/button";
import { DashboardPageHeader } from "@/widgets/header";

export default function AdminTeamActivityPage() {
  const { isAdmin } = useUser();

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
              <Button
                // onClick={handleExport}
                variant="outline"
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </DashboardPageHeader>

            <div className="p-6">
              <div className="space-y-6">
                <TeamActivityFilterForm />
                <SummaryCards />
                <MembersTable />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
