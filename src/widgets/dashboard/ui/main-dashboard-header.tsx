"use client";

import { format } from "date-fns";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/entities/user";
import { greeting } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Skeleton } from "@/shared/ui/skeleton";
import { DashboardPageHeader } from "@/widgets/header";

export const MainDashboardHeader = () => {
  const { user } = useUserStore();

  if (!user) {
    return (
      <div className="flex items-center justify-between bg-white border-b p-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="w-90 h-9" />
          <Skeleton className="w-45 h-4" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="w-40 h-9" />
          <Skeleton className="w-40 h-9" />
        </div>
      </div>
    );
  }

  const isAdmin =
    user.role === "ADMIN" ||
    user.role === "OWNER" ||
    user.role === "SUPER_ADMIN";

  return (
    <DashboardPageHeader
      title={`${greeting()}, ${user.name}! 👋`}
      subTitle={format(new Date(), "EEEE, MMMM d, yyyy")}
    >
      <Link href="/dashboard/tracking">
        <Button variant="outline" className="gap-2">
          <Clock className="h-4 w-4" />
          View Tracking
          <ArrowRight className="h-4 w-4 hidden sm:block" />
        </Button>
      </Link>
      {isAdmin && (
        <Button variant="outline" className="gap-2" asChild>
          <Link href="/dashboard/admin/reports">
            <TrendingUp className="h-4 w-4" />
            View Reports
          </Link>
        </Button>
      )}
    </DashboardPageHeader>
  );
};
