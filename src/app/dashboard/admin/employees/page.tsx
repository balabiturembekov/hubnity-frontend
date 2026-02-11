"use client";

import { Plus, Shield } from "lucide-react";
import { useUserStore } from "@/entities/user";
import {
  EmployeeFilterForm,
  EmployeesTable,
  // ManageEmployeeDialogs,
} from "@/features/employees";
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { EmployeesPageSkeleton, EmployeesStats } from "@/widgets/employees";
import { DashboardPageHeader } from "@/widgets/header/ui/dashboard-page-header";

export default function EmployeesPage() {
  const { user, isInitializing } = useUserStore();

  if (isInitializing || !user) {
    return <EmployeesPageSkeleton />;
  }

  // Check access - show access denied if not admin/owner/super_admin
  if (
    user.role !== "admin" &&
    user.role !== "OWNER" &&
    user.role !== "SUPER_ADMIN"
  ) {
    return (
      <div className="flex h-screen overflow-hidden bg-background">
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto p-6">
            <Card>
              <CardContent className="py-12">
                <div className="text-center text-muted-foreground">
                  <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">Access Denied</h3>
                  <p>Admin privileges required to access this page.</p>
                </div>
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <div className="flex flex-1 flex-col overflow-hidden">
          <main className="flex-1 overflow-y-auto">
            <div className="bg-linear-to-b from-primary/5 via-background to-background">
              <DashboardPageHeader
                title="Employees"
                subTitle="Manage your team members and their roles"
              >
                <Button>
                  <Plus className="h-4 w-4" />
                  Add Employee
                </Button>
              </DashboardPageHeader>

              <div className="p-6">
                <div className="space-y-6">
                  <EmployeesStats />
                  <EmployeeFilterForm />
                  <EmployeesTable />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
