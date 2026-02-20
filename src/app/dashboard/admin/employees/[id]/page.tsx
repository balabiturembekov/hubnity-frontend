"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useGetUserDetailsQuery } from "@/entities/user/model/queries/use-get-user-details.query";
import { Button } from "@/shared/ui/button";
import {
  EmployeeDetailsPageSkeleton,
  EmployeeDetailsProfileHeader,
  EmployeeDetailsTopStats,
  EmployeeTabs,
} from "@/widgets/employee-details";

export default function EmployeeDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const { data: userDetails, isPending } = useGetUserDetailsQuery(id);

  if (isPending) {
    return <EmployeeDetailsPageSkeleton />;
  }

  if (!userDetails) {
    return notFound();
  }

  return (
    <div className="flex h-screen bg-background min-w-0 w-full">
      <main className="flex-1 overflow-y-auto min-w-0">
        <div className="bg-linear-to-b from-primary/5 via-background to-background p-2 pt-6 md:p-6 min-w-0">
          <div className="space-y-4 min-w-0">
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
        </div>
      </main>
    </div>
  );
}
