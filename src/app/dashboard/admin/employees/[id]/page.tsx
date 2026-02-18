"use client";

import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useGetUserDetailsQuery } from "@/entities/user/model/queries/use-get-user-details.query";
import { AdminGuard } from "@/features/auth";
import { Button } from "@/shared/ui/button";
import { TooltipProvider } from "@/shared/ui/tooltip";
import {
  EmployeeDetailsProfileHeader,
  EmployeeDetailsTopStats,
  EmployeeTabs,
} from "@/widgets/employee-details";

export default function EmployeeDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: userDetails, isPending } = useGetUserDetailsQuery(id);

  if (isPending) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  if (!userDetails) {
    return notFound();
  }

  return (
    <TooltipProvider>
      <AdminGuard>
        <div className="flex h-screen overflow-auto bg-background">
          <main className="flex-1 overflow-y-auto">
            <div className="bg-linear-to-b from-primary/5 via-background to-background p-6 space-y-6">
              <Button variant="link" asChild>
                <Link href="/dashboard/admin/employees">
                  <ArrowLeft />
                  Back to Employees
                </Link>
              </Button>

              <EmployeeDetailsProfileHeader userDetails={userDetails} />

              <EmployeeDetailsTopStats userId={userDetails.id} />

              <EmployeeTabs userId={userDetails.id} />
            </div>
          </main>
        </div>
      </AdminGuard>
    </TooltipProvider>
  );
}
