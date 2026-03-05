"use client";

import { format } from "date-fns";
import { ArrowRight, Clock, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useUser } from "@/entities/user";
import { greeting } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { DashboardPageHeader } from "@/widgets/header";

export const MainDashboardHeader = () => {
  const { user, isAdmin } = useUser();

  return (
    <DashboardPageHeader
      title={`${greeting()}, ${user?.name}! 👋`}
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
          <Link href="/dashboard/admin/summaries/full-reports">
            <TrendingUp className="h-4 w-4" />
            View Reports
          </Link>
        </Button>
      )}
    </DashboardPageHeader>
  );
};
